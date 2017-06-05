import { Component, OnDestroy } from '@angular/core';
import { IState } from './shared/state.model';
import { ChartsService } from '../../shared/services/charts.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnDestroy {
  public state: IState;
  private subscription: Subscription = new Subscription();

  constructor(private chartsService: ChartsService) {
    this.subscription.add(this.chartsService.getCar().subscribe(car => {
        if (car === null) {
          this.state = null;
          return;
        }
        this.subscription.add(this.chartsService.getState(car, true).subscribe(
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
