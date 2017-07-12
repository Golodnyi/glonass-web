import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartsService } from '../../shared/services/charts.service';
import { CarsService } from '../../shared/services/cars.service';
import { Car } from '../../shared/models/car.model';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AutoRefresh } from '../../shared/models/auto-refresh.model';
import { Filter } from '../../shared/models/filter.model';
import { EnginesService } from '../../shared/services/engines.service';
import { Engine } from '../../shared/models/engine.model';
import { MapCar } from '../ymaps/shared/map-car.model';
import { MapPolyLines } from '../ymaps/shared/map-polylines.model';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnDestroy {

  public car: Car;
  public options: any = [];
  private subscription: Subscription = new Subscription();
  private subscriptionTimer: Subscription;
  private subscriptionFilter: Subscription;
  private subscriptionAutoRefresh: Subscription;
  private timer = Observable.timer(0, 5000);
  public autoRefresh = new AutoRefresh();
  public filter: Filter;
  public engine: Engine;
  public loading = true;
  public viewMode = true;
  public viewChartMode = true;
  public mapCars: MapCar[];
  public mapPolyLines: MapPolyLines[];
  public move = false;

  private mapUpd(car_id: number) {
    this.chartsService.mapData(car_id).subscribe(data => {
      this.mapCars = [];
      this.mapPolyLines = [];

      if (data.length) {
        const car = new MapCar();
        car.name = this.car.name;
        car.point = [data[data.length - 1][1], data[data.length - 1][2]];
        this.mapCars.push(car);
        const polyLines = new MapPolyLines();
        polyLines.name = 'Маршрут';
        polyLines.color = '#000000';
        data.forEach(d => {
          polyLines.points.push([d[1], d[2]]);
        });
        this.mapPolyLines.push(polyLines);
      }
    });
  }

  private filterInit() {
    this.subscription.add(this.route.queryParams.subscribe(filter => {
        if (Object.keys(filter).length) {
          this.filter = new Filter(filter);
          this.chartsService.setFilter(this.filter);
        } else {
          this.filter = new Filter();
          this.chartsService.setFilter(this.filter);
        }
      })
    );
  }

  private carUpd(car_id: number) {
    this.subscription.add(
      this.carsService.get(car_id, true).subscribe(
        car => {
          this.chartsService.setCar(car);
          this.car = car;
        }
      )
    );
  }

  private engineUpd(car_id: number) {
    this.subscription.add(
      this.enginesService.get(1, 1, car_id, true).subscribe(
        engine => {
          this.engine = engine;
        }
      )
    );
  }

  private chartsUpd() {
    /**
     * подписка на изменение данных
     */
    this.subscription.add(
      this.chartsService.get().subscribe(
        data => {
          if (!data.length) {
            this.options = [];
          }
          data.forEach(item => {
            let exist = false;
            this.options.forEach(options => {
              if (options.id === item.id) {
                options.data = item.data;
                exist = true;
              }
            });
            if (!exist) {
              this.options.push(item);
            }
          });
          this.autoRefresh.afterTime = this.lastTime();
          this.chartsService.setAutoRefresh(this.autoRefresh);
          this.loading = false;
        }
      )
    );
    // end
  }

  private filterUpd(car_id: number) {
    /**
     * Подписка на фильтр
     */
    if (this.subscriptionFilter) {
      this.subscriptionFilter.unsubscribe();
    }
    this.subscriptionFilter = this.chartsService.getFilter().subscribe(
      (filter) => {
        this.loading = true;
        this.filter = filter;
        this.options = [];
        this.autoRefresh.enabled = false;
        this.chartsService.setAutoRefresh(this.autoRefresh);
        this.chartsService.resync(car_id);
      }
    );
  }

  private autoRefreshUpd() {
    if (this.subscriptionAutoRefresh) {
      this.subscriptionAutoRefresh.unsubscribe();
    }
    this.subscriptionAutoRefresh = this.chartsService.getAutoRefresh().subscribe(
      autoRefresh => {
        if ((!autoRefresh.enabled || !this.viewMode) && this.subscriptionTimer) {
          this.subscriptionTimer.unsubscribe();
        }
      }
    );
  }

  constructor(private route: ActivatedRoute,
              private chartsService: ChartsService,
              private carsService: CarsService,
              private enginesService: EnginesService) {
    this.filterInit();
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.options = []; // уничтожаем графики
        const car_id = +params['car'];

        this.carUpd(car_id);
        this.engineUpd(car_id);
        this.mapUpd(car_id);
        this.chartsUpd();
        this.filterUpd(car_id);
        this.autoRefreshUpd();
      })
    );
  }

  public autoRefreshChange(event) {
    this.autoRefresh.enabled = event.checked;
    this.autoRefresh.afterTime = this.lastTime();
    if (this.subscriptionTimer) {
      this.subscriptionTimer.unsubscribe();
    }
    if (this.autoRefresh.enabled) {
      this.subscriptionTimer =
        this.timer.subscribe(
          () => {
            this.chartsService.resync(this.car.id);
          }
        );
    }
    this.chartsService.setAutoRefresh(this.autoRefresh);
  }

  private lastTime(): number {
    const series = this.options[this.options.length - 1];
    if (series) {
      const data = series.data[series.data.length - 1];
      if (data) {
        return data[0];
      }
    }

    return this.autoRefresh.afterTime;
  }

  ngOnDestroy() {
    this.chartsService.setCar(null);
    this.subscription.unsubscribe();
    if (this.subscriptionTimer) {
      this.subscriptionTimer.unsubscribe();
    }
    if (this.subscriptionFilter) {
      this.subscriptionFilter.unsubscribe();
    }
    if (this.subscriptionAutoRefresh) {
      this.subscriptionAutoRefresh.unsubscribe();
    }
  }

  public viewModeChange(event: any) {
    this.autoRefresh.enabled = false;
    this.chartsService.setAutoRefresh(this.autoRefresh);
    if (event.checked) {
      // resync данных при возврате к графикам
      this.chartsService.resync(this.car.id);
    }
  }
}
