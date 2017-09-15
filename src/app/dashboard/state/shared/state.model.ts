import * as moment from 'moment';
import {IIssue} from './issue.model';

export interface IState {
  time: string;
  engine: boolean;
  watch: boolean;
  gsm: boolean;
  network: boolean;
  networkSignal: number;
  roaming: boolean;
  power: boolean;
  motochas: number;
  issues: IIssue[];
  maintenance_date: string;
}

export class State {
  public last_time: string = moment().format('DD.MM.YYYY HH:mm:ss');
  timestamp: string;
  public engine: boolean;
  public watch: boolean;
  public gsm: boolean;
  public network: boolean;
  public networkSignal: number;
  public roaming: boolean;
  public power: boolean;
  public motochas = 0;
  public issues = [];
  public maintenance_date: string;

  get time() {
    return this.last_time;
  }

  set time(t) {
    this.timestamp = t;
    this.last_time = moment(t).format('DD.MM.YYYY HH:mm:ss');
  }
}
