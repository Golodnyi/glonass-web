import { ICar } from './interface/ICar';
import { ITree } from './interface/ITree';
export class Car implements ICar, ITree {
  id: number;
  model_id: number;
  name: string;
  subdivision_id: number;
  is_visible: number;

  public getClassName() {
    return this.constructor.name;
  }
}
