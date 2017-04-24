import {ISubdivision} from './interface/ISubdivision';
import {ICompany} from './interface/ICompany';
import {IUser} from './interface/IUser';
import {ITree} from './interface/ITree';
export class Subdivision implements ISubdivision, ITree {
  id: number;
  name: string;
  company_id: number;
  company: ICompany;
  author_id: number;
  author: IUser;
  created_at: string;
  updated_at: string;

  public getClassName() {
    return this.constructor.name;
  }
}
