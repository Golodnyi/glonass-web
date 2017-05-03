import { IRole } from './interface/IRole';
import { IUser } from './interface/IUser';
export class User implements IUser {
  id: number;
  login: string;
  name: string;
  email: string;
  role_id: number;
  role: IRole;
  active: number;
  created_at: string;
  updated_at: string;

  public getClassName() {
    return this.constructor.name;
  }
}
