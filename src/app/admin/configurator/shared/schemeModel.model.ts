export interface ISchemeModel {
  id: number;
  name: string;
  units: string;
  port: string;
  allowedPorts;
}

export class SchemeModel implements ISchemeModel {
  public id: number;
  public name: string;
  public units: string;
  public port: string;
  public allowedPorts = [];
}
