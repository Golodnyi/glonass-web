import { ITree } from './Tree';

export interface IEngine {
  id: number;
  esn: number;
  name: string;
  model_id: number;
  sensors_config: {};
}

export class Engine implements IEngine, ITree {
  id: number;
  name: string;
  model_id: number;
  sensors_config: {};

  set esn(param: number) {
    this.name = String(param);
  }

  get esn(): number {
    return Number(this.name);
  }
}
