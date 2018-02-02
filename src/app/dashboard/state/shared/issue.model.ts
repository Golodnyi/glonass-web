export interface IIssue {
    id: number;
    name: string;
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
    public name: string;
    public minDuration: number;
    public maxDuration: number;
    public duration: number;
    public forecast: any[];
    public reasons: any[];
    public createdAt: number;
    public lastCheckAt: number;
}
