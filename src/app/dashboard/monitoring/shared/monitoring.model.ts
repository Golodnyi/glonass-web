export interface IMonitoring {
    issue_locations: any;
    issues: any[];
    sensors: any;
}

export class Monitoring implements IMonitoring {
    public issue_locations: any;
    public issues: any[];
    public sensors: any;
}
