import { IUser } from './user.model';
import { ITree } from './tree.model';
import { ICompany } from './company.model';
import { Car } from './car.model';

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
  public id: number;
  public name: string;
  public company_id: number;
  public company: ICompany;
  public author_id: number;
  public author: IUser;
  public created_at: string;
  public updated_at: string;
  public cars: Car[];
}
