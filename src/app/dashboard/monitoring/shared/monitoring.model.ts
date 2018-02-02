import {IIssue} from '../../state/shared/issue.model';
export interface IMonitoring {
    issue_locations: any;
    issues: IIssue[];
    sensors: any;
}

export class Monitoring implements IMonitoring {
    public issue_locations: any;
    public issues: IIssue[];
    public sensors: any;
}
