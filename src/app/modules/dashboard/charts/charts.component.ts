import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartsService } from '../../../services/charts.service';
import { CarsService } from '../../../services/cars.service';
import { Car } from '../../../models/Car';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AutoRefresh } from '../../../models/AutoRefresh';

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
  private timer = Observable.timer(0, 5000);
  public autoRefresh = new AutoRefresh();
  public filter;

  constructor(private route: ActivatedRoute,
              private chartsService: ChartsService,
              private carsService: CarsService) {
    this.route.params.subscribe(params => {
        this.options = [];
        this.chartsService.setAutoRefresh(this.autoRefresh);
        const car_id = +params['car'];
        this.subscription.add(
          this.carsService.get(car_id, true).subscribe(
            car => {
              this.car = car;
            }
          )
        );
        this.subscription.add(
          this.chartsService.getAutoRefresh().subscribe(
            autoRefresh => {
              if (this.subscriptionTimer) {
                this.subscriptionTimer.unsubscribe();
              }

              if (autoRefresh.enabled) {
                this.subscriptionTimer =
                  this.timer.subscribe(
                    () => {
                      this.chartsService.resync(this.car.id);
                    }
                  );
              }
            }
          )
        );

        if (!this.autoRefresh.enabled) {
          this.chartsService.resync(car_id);
        }
        /**
         * TODO: костыль, переписать.
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
              this.autoRefresh.afterTime = this.lastTime();
              this.chartsService.setAutoRefresh(this.autoRefresh);
            }
          )
        );
        // end
        this.subscription.add(
          this.chartsService.getFilter().subscribe(
            (filter) => {
              this.filter = filter;

              if (filter && filter.enabled && !filter.last) {
                this.autoRefresh.enabled = false;
                this.chartsService.setAutoRefresh(this.autoRefresh);
              }

              this.chartsService.resync(car_id);
            }
          )
        );
      }
    );
  }

  public autoRefreshChange(event) {
    this.autoRefresh.enabled = event.checked;
    this.autoRefresh.afterTime = this.lastTime();
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

    return Date.now() - 1000;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.subscriptionTimer) {
      this.subscriptionTimer.unsubscribe();
    }
  }
}
