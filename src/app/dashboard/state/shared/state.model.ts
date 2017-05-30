export interface IState {
  last_date: string;
  engine: boolean;
  gsm: boolean;
  time: boolean;
  network: boolean;
  network_signal: number;
  roaming: boolean;
  power: boolean;
  motochas: number;
}
export class State {
  public last_date: string;
  public engine: boolean;
  public gsm: boolean;
  public time: boolean;
  public network: boolean;
  public network_signal = 0;
  public roaming: boolean;
  public power: boolean;
  public motochas = 0;
}
