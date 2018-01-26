export interface IRole {
    id: number;
    name: string;
    is_global: number;
}

export class Role implements IRole {
    public id: number;
    public name: string;
    public is_global: number;
}
