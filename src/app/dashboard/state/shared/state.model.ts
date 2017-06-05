import * as moment from 'moment';

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
}
export class State {
  public last_time: string = moment().format('DD.MM.YYYY HH:mm:ss');
  set time(t) {
    this.last_time = moment(t).format('DD.MM.YYYY HH:mm:ss');
  }
  get time() {
    return this.last_time;
  }
  public engine: boolean;
  public watch: boolean;
  public gsm: boolean;
  public network: boolean;
  public networkSignal: number;
  public roaming: boolean;
  public power: boolean;
  public motochas = 0;
}
