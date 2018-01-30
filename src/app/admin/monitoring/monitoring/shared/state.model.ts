import {Company} from '../../../../shared/models/company.model';
import {CarModel} from '../../../../shared/models/car-model.model';
import {Subdivision} from '../../../../shared/models/subdivision.model';

export interface IState {
    company: Company;
    id: number;
    issues: any;
    model: CarModel;
    name: string;
    subdivision: Subdivision;
}

export class State implements IState {
    public company: Company;
    public id: number;
    public issues: any;
    public model: CarModel;
    public name: string;
    public subdivision: Subdivision;
}
