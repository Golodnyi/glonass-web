import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartsService } from '../../../services/charts.service';
import { CarsService } from '../../../services/cars.service';
import { Car } from '../../../models/Car';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AutoRefresh } from '../../../models/AutoRefresh';
import { Filter } from '../../../models/Filter';
import { EnginesService } from '../../../services/engines.service';
import { Engine } from '../../../models/Engine';

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

  constructor(private route: ActivatedRoute,
              private chartsService: ChartsService,
              private carsService: CarsService,
              private router: Router,
              private enginesService: EnginesService) {
    this.route.params.subscribe(params => {
        this.options = []; // уничтожаем графики
        const car_id = +params['car'];
        this.subscription.add(
          this.carsService.get(car_id, true).subscribe(
            car => {
              this.car = car;
            }
          )
        );
        this.route.queryParams.subscribe(filter => {
          if (Object.keys(filter).length) {
            this.filter = new Filter(filter);
            this.chartsService.setFilter(this.filter);
          } else {
            this.filter = new Filter();
          }
        });
        this.subscription.add(
          this.enginesService.get(1, 1, car_id, true).subscribe(
            engine => {
              this.engine = engine;
            }
          )
        );
        ;
        /**
         * подписка на изменение данных
         */
        this.subscription.add(
          this.chartsService.get().subscribe(
            data => {
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
            }
          )
        );
        // end

        /**
         * Подписка на фильтр
         */
        if (this.subscriptionFilter) {
          this.subscriptionFilter.unsubscribe();
        }
        this.subscriptionFilter = this.chartsService.getFilter().subscribe(
          (filter) => {
            this.filter = filter;
            let qparams;
            if (filter.enabled) {
              if (filter.charts && !Array.isArray(filter.charts)) {
                filter.charts = [filter.charts];
              }
              qparams = filter;
            } else {
              qparams = {};
            }

            this.options = [];
            this.autoRefresh.enabled = false;
            this.chartsService.setAutoRefresh(this.autoRefresh);
            this.chartsService.resync(car_id);
            this.router.navigate([], {queryParams: qparams});
          }
        );

        if (this.subscriptionAutoRefresh) {
          this.subscriptionAutoRefresh.unsubscribe();
        }
        this.subscriptionAutoRefresh = this.chartsService.getAutoRefresh().subscribe(
          autoRefresh => {
            if (!autoRefresh.enabled && this.subscriptionTimer) {
              this.subscriptionTimer.unsubscribe();
            }
          }
        );
      }
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
}
