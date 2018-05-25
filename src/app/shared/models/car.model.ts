import { ITree } from './tree.model';
import { IEngine } from './engine.model';
import { State } from '../../dashboard/state/shared/state.model';
import { Monitoring } from '../../dashboard/monitoring/shared/monitoring.model';

export interface ICar {
    id: number;
    model_id: number;
    name: string;
    subdivision_id: number;
    is_visible: number;
}

export class Car implements ICar, ITree {
    public id: number;
    public model_id: number;
    public name: string;
    public subdivision_id: number;
    public is_visible: number;
    public engine: IEngine;
    public company_id: number;
    public state: State;
    public monitoring: Monitoring;
}
