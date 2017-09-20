import {Component, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ChartsService} from '../../shared/services/charts.service';
import {CarsService} from '../../shared/services/cars.service';
import {Car} from '../../shared/models/car.model';
import {Subscription} from 'rxjs/Subscription';
import {Filter} from '../../shared/models/filter.model';
import {EnginesService} from '../../shared/services/engines.service';
import {Engine} from '../../shared/models/engine.model';
import {SelectItem} from 'primeng/primeng';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnDestroy {

  public car: Car;
  public filter: Filter;
  public engine: Engine;
  public move = false;
  public viewModeButtons: SelectItem[] = [];
  public viewMode = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
  private subscriptionFilter: Subscription;
  private subscriptionAutoRefresh: Subscription;
  private subscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private chartsService: ChartsService,
              private carsService: CarsService,
              private enginesService: EnginesService) {
    this.viewModeButtons.push({label: 'Графики', value: 'charts'});
    this.viewModeButtons.push({label: 'Таблица', value: 'table'});
    this.viewModeButtons.push({label: 'Карта', value: 'map'});
    this.filterInit();
    this.subscription.add(
      this.route.params.subscribe(params => {
        const car_id = +params['car'];
        this.carUpd(car_id);
        this.engineUpd(car_id);
      })
    );
  }

  ngOnDestroy() {
    this.chartsService.setCar(null);
    this.subscription.unsubscribe();
    if (this.subscriptionFilter) {
      this.subscriptionFilter.unsubscribe();
    }
    if (this.subscriptionAutoRefresh) {
      this.subscriptionAutoRefresh.unsubscribe();
    }
  }

  public viewModeChange(event: any) {
    this.router.navigate(['dashboard', 'view', this.car.id, event.value]);
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
          if (Object.keys(car).length) {
            this.chartsService.setCar(car);
            this.car = car;
          }
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
}