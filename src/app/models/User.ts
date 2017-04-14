import {Role} from './Role';
export class User {
    id: number;
    login: string;
    name: string;
    email: string;
    role_id: number;
    role: Role;
    active: number;
    created_at: Date;
    updated_at: Date;
}
