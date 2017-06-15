import { Component, Input, OnDestroy } from '@angular/core';
import { IState, State } from './shared/state.model';
import { ChartsService } from '../../shared/services/charts.service';
import { Subscription } from 'rxjs/Subscription';
import { CarsService } from '../../shared/services/cars.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent {
  @Input() state: State;
  @Input() title: string;
  constructor() {
  }
}
