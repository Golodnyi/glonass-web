import {IRole} from './interface/IRole';
import {IUser} from './interface/IUser';
export class User implements IUser {
    id: number = null;
    login: string = null;
    name: string = null;
    email: string = null;
    role_id: number = null;
    role: IRole = null;
    active: number = null;
    created_at: Date = null;
    updated_at: Date = null;
}
