import * as moment from 'moment';

export interface IIssue {
  name: string;
  minDuration: number;
  maxDuration: number;
  duration: number;
  forecast: string;
  createdAt: number;
  lastCheckAt: number;
}
export class Issue {
  public name: string;
  public minDuration: number;
  public maxDuration: number;
  public duration: number;
  public forecast: string;
  public createdAt: number;
  public lastCheckAt: number;
}
