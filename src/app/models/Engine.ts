import {IEngine} from './interface/IEngine';
import {ITree} from './interface/ITree';
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
  public getClassName() {
    return this.constructor.name;
  }
}
