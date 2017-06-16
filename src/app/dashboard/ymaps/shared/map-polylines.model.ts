export interface IMapPolyLines {
  name: string;
  color: string;
  points: any;
}

export class MapPolyLines implements IMapPolyLines {
  public name: string;
  public color: string;
  public points = [];
}
