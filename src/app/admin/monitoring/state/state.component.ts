import {Component, Input} from '@angular/core';
import {State} from '../monitoring/shared/state.model';
import * as moment from 'moment';

@Component({
  selector: 'app-admin-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent {
  @Input() state: State;

  constructor() {
  }

  public online(timestamp: number) {
    return (Number(moment().format('X')) - Number(timestamp) / 1000) < 3600;
  }

  public lastDate(timestamp: number) {
    return moment.unix(timestamp / 1000).format('DD.MM.YYYY h:mm');
  }
}
