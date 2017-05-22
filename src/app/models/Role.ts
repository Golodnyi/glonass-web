export interface IRole {
  id: number;
  name: string;
  is_global: number;
}

export class Role implements IRole {
  id: number;
  name: string;
  is_global: number;
}
