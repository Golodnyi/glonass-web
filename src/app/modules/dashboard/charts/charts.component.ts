import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartsService } from '../../../services/charts.service';
import { CarsService } from '../../../services/cars.service';
import { Car } from '../../../models/Car';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MsgService } from '../../../services/msg';

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
  public filter;

  constructor(private route: ActivatedRoute,
              private chartsService: ChartsService,
              private carsService: CarsService,
              private msgService: MsgService) {
    this.route.params.subscribe(params => {
        const car_id = +params['car'];
        this.carsService.get(car_id).subscribe(
          car => {
            this.car = car;
          }
        );
        this.chartsService.getAutoRefresh().subscribe(
          autoRefresh => {
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
        /**
         * TODO: костыль, переписать.
         */
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
            this.options.forEach((option, index) => {
              let exist = false;
              data.forEach(item => {
                if (option.id === item.id) {
                  exist = true;
                }
              });
              if (!exist) {
                delete this.options[index];
              }
            });
          }
        );
        // end
        this.chartsService.getFilter().subscribe(
          (filter) => {
            this.filter = filter;

            if (filter && filter.enabled && !filter.last) {
              this.chartsService.setAutoRefresh({enabled: false, afterTime: this.lastTime()});
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
