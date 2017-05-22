import { ITree } from './Tree';
import { IEngine } from './Engine';

export interface ICar {
  id: number;
  model_id: number;
  name: string;
  subdivision_id: number;
  is_visible: number;
}

export class Car implements ICar, ITree {
  id: number;
  model_id: number;
  name: string;
  subdivision_id: number;
  is_visible: number;
  engine: IEngine;
}
