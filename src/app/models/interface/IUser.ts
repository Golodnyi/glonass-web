import {IRole} from './IRole';
export interface IUser {
  id: number;
  login: string;
  name: string;
  email: string;
  role_id: number;
  role: IRole;
  active: number;
  created_at: Date;
  updated_at: Date;
}
