import {IUser} from './interface/IUser';
import {ICompany} from './interface/ICompany';
import {ITree} from './interface/ITree';
export class Company implements ICompany, ITree {
  id: number;
  name: string;
  author_id: number;
  author: IUser;
  active_till: string;
  created_at: string;
  updated_at: string;

  public getClassName() {
    return this.constructor.name;
  }
}
