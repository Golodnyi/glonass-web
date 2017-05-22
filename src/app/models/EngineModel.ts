export interface IEngineModel {
  id: number;
  name: string;
  sensors_config: string;
}

export class EngineModel implements IEngineModel {
  id: number;
  name: string;
  sensors_config: string;
}
