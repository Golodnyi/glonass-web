import {IRole} from './interface/IRole';
import {IUser} from './interface/IUser';
import * as moment from 'moment';
export class User implements IUser {
    id: number;
    login: string;
    name: string;
    email: string;
    role_id: number;
    role: IRole;
    active: number;
    private _created_at: Date;
    private _updated_at: Date;
    get created_at(): Date {
        return this._created_at;
    }
    set created_at(date) {
        this._created_at = moment(date).toDate();
    }
    get updated_at(): Date {
        return this._updated_at;
    }
    set updated_at(date) {
        this._updated_at = moment(date).toDate();
    }
}
