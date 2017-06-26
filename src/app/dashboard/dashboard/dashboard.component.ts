import { Component, OnDestroy } from '@angular/core';
import { CarsService } from '../../shared/services/cars.service';
import { ChartsService } from '../../shared/services/charts.service';
import { IState } from '../state/shared/state.model';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  public state: IState;
  public stateTitle: string;
  private subscription: Subscription = new Subscription();
  private subscriptionTimer: Subscription;
  private timer = Observable.timer(0, 5000);

  constructor(private carsService: CarsService, private chartsService: ChartsService) {
    this.subscription.add(
      this.chartsService.getCar().subscribe(car => {
        if (car === null || !Object.keys(car).length) {
          this.state = null;
          if (this.subscriptionTimer) {
            this.subscriptionTimer.unsubscribe();
          }
          return;
        }
        if (this.subscriptionTimer) {
          this.subscriptionTimer.unsubscribe();
        }
        this.stateTitle = 'Состояние ' + car.name;
        this.subscriptionTimer =
          this.timer.subscribe(() => {
            this.carsService.getState(car.id).subscribe(
              state => {
                this.state = state;
              }
            );
          });
      })
    );
  }

  ngOnDestroy() {
    if (this.subscriptionTimer) {
      this.subscriptionTimer.unsubscribe();
    }
    this.subscription.unsubscribe();
  }
}
