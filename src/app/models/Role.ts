import { IRole } from './interface/IRole';
export class Role implements IRole {
  id: number;
  name: string;
  is_global: number;
}
