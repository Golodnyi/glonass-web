import { IRole } from './Role';

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

export class User implements IUser {
  id: number;
  login: string;
  name: string;
  email: string;
  password: string;
  role_id: number;
  role: IRole;
  active: number;
  created_at: string;
  updated_at: string;
}
