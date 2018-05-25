import { Report } from './report.model';
import { Maintenance } from './maintenance.model';
import { Value } from './value.model';

export interface ICapital {
    report: Report;
    maintenance: Maintenance;
    value: Value;
    limits: Value;
}

export class Capital implements ICapital {
    public report: Report;
    public maintenance: Maintenance;
    public value: Value;
    public limits: Value;
}
