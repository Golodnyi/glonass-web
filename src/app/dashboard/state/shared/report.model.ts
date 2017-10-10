export interface IReport {
  type: string;
  comment: string;
  date: string;
}

export class Report implements IReport {
  public type: string;
  public comment: string;
  public date: string;
}
