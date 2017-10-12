import {BaseEngine} from '../../../../shared/models/baseEngine.model';

export interface INewEngine {
  useModelSensors: boolean;
  resetSensors: boolean;
  car_id: number;
  subdivision_id: number;
  engine: BaseEngine;
}

export class NewEngine implements INewEngine {
  public useModelSensors = true;
  public resetSensors = false;
  public car_id: number;
  public subdivision_id: number;
  public engine: BaseEngine = new BaseEngine();
}
