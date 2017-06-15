import { Component, OnDestroy } from '@angular/core';
import { CarsService } from '../../shared/services/cars.service';
import { ChartsService } from '../../shared/services/charts.service';
import { IState } from '../state/shared/state.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy {
  public state: IState;
  public stateTitle: string;
  private subscription: Subscription = new Subscription();

  constructor(private carsService: CarsService, private chartsService: ChartsService) {
    this.subscription.add(
      this.chartsService.getCar().subscribe(car => {
        if (car === null) {
          this.state = null;
          return;
        }
        this.stateTitle = 'Состояние ' + car.name;
        this.subscription.add(
          this.carsService.getState(car.id).subscribe(
            state => {
              this.state = state;
            }
          )
        );
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
