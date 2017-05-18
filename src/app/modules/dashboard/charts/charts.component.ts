import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartsService } from '../../../services/charts.service';
import { CarsService } from '../../../services/cars.service';
import { Car } from '../../../models/Car';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnDestroy {

  public car: Car;
  public options: any = [];
  private subscription: Subscription;
  private timer = Observable.timer(0, 5000);
  public aRefresh: boolean;

  constructor(private route: ActivatedRoute,
              private chartsService: ChartsService,
              private carsService: CarsService) {
    this.route.params.subscribe(params => {
        const car_id = +params['car'];
        this.carsService.get(car_id).subscribe(
          car => {
            this.car = car;
          }
        );
      this.chartsService.getAutoRefresh().subscribe(
        autoRefresh => {
          if (autoRefresh === null) {
            return false;
          }
          this.aRefresh = autoRefresh.enabled;

          if (this.subscription) {
            this.subscription.unsubscribe();
          }

          if (this.aRefresh) {
            this.subscription = this.timer.subscribe(
              () => {
                this.chartsService.resync(this.car.id);
              }
            );
          }
        }
      );
        this.chartsService.resync(car_id);
        this.chartsService.get().subscribe(
          data => {
            if (data === null) {
              return false;
            }
            if (this.options.length === data.length) {
              this.options.forEach(option => {
                data.forEach(item => {
                  if (option.id === item.id) {
                    option.data = item.data;
                  }
                });
              });
            } else {
              this.options = [];
              data.forEach(item => {
                this.options.push(Object.assign({}, item));
              });
            }
          }
        );
        this.chartsService.getFilter().subscribe(
          (filter) => {
            if (filter === null) {
              return false;
            }
            this.chartsService.resync(car_id);
          }
        );
      }
    );
  }

  public autoRefresh(event) {
    this.chartsService.setAutoRefresh({enabled: event.checked, afterTime: this.lastTime()});
  }

  private lastTime(): number {
    const series = this.options[this.options.length - 1];
    if (series) {
      const data = series.data[series.data.length - 1];
      if (data) {
        return data[0];
      }
    }

    return Date.now() - 1000;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
