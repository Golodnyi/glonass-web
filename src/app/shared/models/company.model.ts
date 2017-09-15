import {IUser} from './user.model';
import {ITree} from './tree.model';

export interface ICompany {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  active_till: string;
  author_id: number;
  author: IUser;
}

export class Company implements ICompany, ITree {
  public id: number;
  public name: string;
  public author_id: number;
  public author: IUser;
  public active_till: string;
  public created_at: string;
  public updated_at: string;
}
