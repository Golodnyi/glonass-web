import {ICar} from './interface/ICar';
export class Car implements ICar {
  id: number;
  model_id: number;
  name: string;
  subdivision_id: number;
  is_visible: number;
}
