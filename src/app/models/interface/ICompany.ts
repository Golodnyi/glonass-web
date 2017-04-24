import {IUser} from './IUser';
export interface ICompany {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
  active_till: string;
  author_id: number;
  author: IUser;
}
