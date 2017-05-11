import { IEngineModel } from './interface/IEngineModel';
export class EngineModel implements IEngineModel {
  id: number;
  name: string;
  sensors_config: string;
}
