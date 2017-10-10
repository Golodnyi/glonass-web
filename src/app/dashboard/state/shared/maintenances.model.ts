import {Capital} from './capital.model';

export interface IMaintenances {
  capital: Capital;
  scheduled: Capital;
}

export class Maintenances implements IMaintenances {
  public capital: Capital;
  public scheduled: Capital;
}
