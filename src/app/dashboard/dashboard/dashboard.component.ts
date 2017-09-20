import {Component, OnDestroy} from '@angular/core';
import {CarsService} from '../../shared/services/cars.service';
import {ChartsService} from '../../shared/services/charts.service';
import {IState} from '../state/shared/state.model';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {EnginesService} from '../../shared/services/engines.service';
import {Engine} from '../../shared/models/engine.model';
import {Car} from '../../shared/models/car.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  public state: IState;
  public car: Car;
  private subscription: Subscription = new Subscription();
  private subscriptionTimer: Subscription;
  private timer = Observable.timer(0, 5000);

  constructor(private carsService: CarsService,
              private chartsService: ChartsService,
              private engineService: EnginesService) {
    this.subscription.add(
      this.chartsService.getCar().subscribe(car => {
        this.car = car;

        if (car === null || !Object.keys(car).length) {
          this.state = null;
          if (this.subscriptionTimer) {
            this.subscriptionTimer.unsubscribe();
          }
          return;
        }
        this.engineService.get(1, 1, car.id, true).subscribe(
          engine => {
            car.engine = Object.assign(new Engine(), engine);
          }
        );

        if (this.subscriptionTimer) {
          this.subscriptionTimer.unsubscribe();
        }
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
