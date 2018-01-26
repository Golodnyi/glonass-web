import {IRole} from './role.model';

export interface IUser {
    id: number;
    login: string;
    name: string;
    email: string;
    role_id: number;
    role: IRole;
    active: number;
    company_id: number;
    created_at: string;
    updated_at: string;
}

export class User implements IUser {
    public id: number;
    public login: string;
    public name: string;
    public email: string;
    public password: string;
    public role_id: number;
    public role: IRole;
    public active: number;
    public company_id: number;
    public created_at: string;
    public updated_at: string;
}
