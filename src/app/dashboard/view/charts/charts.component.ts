import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ChartsService } from '../../../shared/services/charts.service';
import { Car } from '../../../shared/models/car.model';
import { Observable } from 'rxjs/Observable';
import { AutoRefresh } from '../../../shared/models/auto-refresh.model';
import {TimerObservable} from 'rxjs/observable/TimerObservable';

@Component({
  selector: 'app-charts-view',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnDestroy {
  public options: any = [];
  public loading = true;
  private subscription: Subscription = new Subscription();
  private subscriptionAutoRefresh: Subscription;
  private subscriptionFilter: Subscription;
  private timer = TimerObservable.create(5000, 5000);
  private autoRefresh = new AutoRefresh();

  constructor(private chartsService: ChartsService) {
    this.update();
    this.subscription.add(
      this.chartsService.getCar().subscribe(car => {
        if (this.subscriptionAutoRefresh) {
          this.subscriptionAutoRefresh.unsubscribe();
        }
        if (this.subscriptionFilter) {
          this.subscriptionFilter.unsubscribe();
        }
        this.options = [];
        this.subscriptionFilter =
          this.chartsService.getFilter().subscribe(
            (filter) => {
              if (car) {
                this.options = [];
                this.autoUpdate(car, filter.last);
              }
            }
          );
      })
    );

  }

  ngOnDestroy() {
    this.options = [];
    this.subscription.unsubscribe();
    if (this.subscriptionAutoRefresh) {
      this.subscriptionAutoRefresh.unsubscribe();
    }
    if (this.subscriptionFilter) {
      this.subscriptionFilter.unsubscribe();
    }
  }

  private update() {
    this.subscription.add(
      this.chartsService.get().subscribe(
        data => {
          this.loading = true;
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
          this.loading = false;
        }
      )
    );
  }

  private autoUpdate(car: Car, autoUpdate: boolean) {
    if (this.subscriptionAutoRefresh) {
      this.subscriptionAutoRefresh.unsubscribe();
    }
    this.autoRefresh.enabled = false;
    this.chartsService.setAutoRefresh(this.autoRefresh);
    if (autoUpdate) {
      if (!this.options.length) {
        this.chartsService.resync(car);
      }
      this.subscriptionAutoRefresh = this.timer.subscribe(
        () => {
          this.autoRefresh.enabled = true;
          this.autoRefresh.afterTime = this.lastTime();
          this.chartsService.setAutoRefresh(this.autoRefresh);
          this.chartsService.resync(car);
        }
      );
    } else {
      this.chartsService.resync(car);
    }
  }

  private lastTime(): number {
    if (this.options) {
      const series = this.options[this.options.length - 1];
      if (series) {
        const data = series.data[series.data.length - 1];
        if (data) {
          return data[0];
        }
      }
    }
    return this.autoRefresh.afterTime;
  }
}
