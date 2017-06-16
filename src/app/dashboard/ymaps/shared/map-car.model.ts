export interface IMapCar {
  name: string;
  point: any;
}

export class MapCar implements IMapCar {
  public name: string;
  public point = [];
}
