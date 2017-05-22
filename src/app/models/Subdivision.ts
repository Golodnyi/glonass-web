import { IUser } from './User';
import { ITree } from './Tree';
import { ICompany } from './Company';

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
export class Subdivision implements ISubdivision, ITree {
  id: number;
  name: string;
  company_id: number;
  company: ICompany;
  author_id: number;
  author: IUser;
  created_at: string;
  updated_at: string;
}
