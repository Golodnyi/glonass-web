import {ICar} from './interface/ICar';
export class Car implements ICar {
    id: number = null;
    model_id: number = null;
    name: string = null;
    subdivision_id: number = null;
    is_visible: number = null;
}
