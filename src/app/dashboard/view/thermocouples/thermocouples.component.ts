import { Component, OnInit } from '@angular/core';
import { ChartsService } from 'app/shared/services/charts.service';
import { Subscription } from 'rxjs/Subscription';
import { Car } from 'app/shared/models/car.model';
import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { AutoRefresh } from 'app/shared/models/auto-refresh.model';

@Component({
  selector: 'app-thermocouples',
  templateUrl: './thermocouples.component.html',
  styleUrls: ['./thermocouples.component.css']
})
export class ThermocouplesComponent implements OnDestroy {
  private subscription: Subscription = new Subscription();
  private subscriptionAutoRefresh: Subscription;
  private timer = TimerObservable.create(0, 5000);
  private autoRefresh = new AutoRefresh();
  public options: any;
  public table: any;
  public car: Car;

  constructor(private chartsService: ChartsService) {
    this.chartsService.getCar().subscribe(car => {
      if (!car) {
        return false;
      }
      this.car = car;
      this.autoRefresh.afterTime = 0;
      this.autoUpdate(this.car);
    });
  }

  private autoUpdate(car: Car) {
    if (this.subscriptionAutoRefresh) {
      this.subscriptionAutoRefresh.unsubscribe();
    }
    this.subscriptionAutoRefresh = this.timer.subscribe(
      () => {
        this.chartsService.thermocouples(car, this.lastTime()).subscribe(
          thermocouples => {
            if (!this.options) {
              this.options = thermocouples;
            } else {
              this.options.data = thermocouples.data;
            }
          }
        );
      }
    );
  }

  private lastTime(): number {
    if (this.options && this.options.data && this.options.data.length) {
      const series = this.options.data[this.options.data.length - 1];
      if (series) {
        const data = series.data[series.data.length - 1];
        if (data) {
          this.autoRefresh.afterTime = data[0];
          return data[0];
        }
      }
    }
    return this.autoRefresh.afterTime;
  }

  ngOnDestroy() {
    this.subscriptionAutoRefresh.unsubscribe();
  }
}
