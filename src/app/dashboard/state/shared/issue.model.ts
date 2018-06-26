export interface IIssueName {
    message: string;
    sources: any;
}
export interface IIssue {
    id: number;
    name: IIssueName;
    minDuration: number;
    maxDuration: number;
    duration: number;
    forecast: any[];
    reasons: any[];
    createdAt: number;
    lastCheckAt: number;
}

export class Issue implements IIssue {
    public id: number;
    public name: IIssueName;
    public minDuration: number;
    public maxDuration: number;
    public duration: number;
    public forecast: any[];
    public reasons: any[];
    public createdAt: number;
    public lastCheckAt: number;
}
