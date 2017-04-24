import {IRole} from './IRole';
export interface IUser {
  id: number;
  login: string;
  name: string;
  email: string;
  role_id: number;
  role: IRole;
  active: number;
  created_at: string;
  updated_at: string;
}
