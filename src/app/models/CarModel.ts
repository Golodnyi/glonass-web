import { ICarModel } from './interface/ICarModel';
export class CarModel implements ICarModel {
  id: number;
  name: string;

  public getClassName() {
    return this.constructor.name;
  }
}
