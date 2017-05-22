import { IUser } from './User';
import { ITree } from './Tree';

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
  id: number;
  name: string;
  author_id: number;
  author: IUser;
  active_till: string;
  created_at: string;
  updated_at: string;
}
