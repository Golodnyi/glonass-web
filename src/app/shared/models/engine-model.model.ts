export interface IEngineModel {
  id: number;
  name: string;
  sensors_config: string;
}

export class EngineModel implements IEngineModel {
  public id: number;
  public name: string;
  public sensors_config: string;
}
