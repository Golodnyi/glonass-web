export interface IIssue {
  id: number;
  name: string;
  minDuration: number;
  maxDuration: number;
  duration: number;
  forecast: string;
  createdAt: number;
  lastCheckAt: number;
}

export class Issue implements IIssue {
  public id: number;
  public name: string;
  public minDuration: number;
  public maxDuration: number;
  public duration: number;
  public forecast: string;
  public createdAt: number;
  public lastCheckAt: number;
}
