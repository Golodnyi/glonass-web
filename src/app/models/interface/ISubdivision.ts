import {IUser} from './IUser';
import {ICompany} from './ICompany';
export interface ISubdivision {
  id: number;
  name: string;
  company_id: number;
  company: ICompany;
  created_at: string;
  updated_at: string;
  author_id: number;
  author: IUser;
}
