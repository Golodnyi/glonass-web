import { ITree } from './tree.model';

export interface IEngine {
  id: number;
  esn: number;
  name: string;
  model_id: number;
  sensors_config: {};
}

export class Engine implements IEngine, ITree {
  public id: number;
  public name: string;
  public model_id: number;
  public sensors_config: {};

  set esn(param: number) {
    this.name = String(param);
  }

  get esn(): number {
    return Number(this.name);
  }
}