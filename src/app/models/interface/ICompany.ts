import {IUser} from './IUser';
export interface ICompany {
  id: number;
  name: string;
  created_at: Date;
  updated_at: Date;
  active_till: Date;
  author_id: number;
  author: IUser;
}
