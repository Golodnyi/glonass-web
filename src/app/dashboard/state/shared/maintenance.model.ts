export interface IMaintenance {
  id: number;
  engine_id: number;
  author_id: number;
  active: number;
  comment: string;
  type: string;
  date: string;
}

export class Maintenance implements IMaintenance {
  public id: number;
  public engine_id: number;
  public author_id: number;
  public active: number;
  public comment: string;
  public type: string;
  public date: string;
}
