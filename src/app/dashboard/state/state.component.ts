import { Component, Input } from '@angular/core';
import { State } from './shared/state.model';
import * as moment from 'moment';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent {
  @Input() state: State;
  @Input() title: string;
  @Input() toggleable = true;
  @Input() compact = false;
  constructor() {
  }

  public online() {
    return (Number(moment().format('X')) - Number(this.state.timestamp)) < 3600;
  }
}
