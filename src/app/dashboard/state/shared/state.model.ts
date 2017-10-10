import * as moment from 'moment';
import {IIssue} from './issue.model';
import {Maintenances} from './maintenances.model';

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
  maintenance: Maintenances;
}

export class State implements IState {
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
  public issues: IIssue[] = [];
  public maintenance_date: string;
  public maintenance: Maintenances;

  get time() {
    return this.last_time;
  }

  set time(t) {
    this.timestamp = t;
    this.last_time = moment(t).format('DD.MM.YYYY HH:mm:ss');
  }
}
