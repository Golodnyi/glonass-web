import {IUser} from './interface/IUser';
import {ICompany} from './interface/ICompany';
import * as moment from 'moment';
export class Company implements ICompany {
    id: number;
    name: string;
    author_id: number;
    author: IUser;
    private _active_till: Date;
    private _created_at: Date;
    private _updated_at: Date;
    set active_till(date) {
        this._active_till = moment(date).toDate();
    }
    get active_till(): Date {
        return this._active_till;
    }
    set created_at(date) {
        this._created_at = moment(date).toDate();
    }
    get created_at(): Date {
        return this.created_at;
    }
    set updated_at(date) {
        this._updated_at = moment(date).toDate();
    }
    get updated_at(): Date {
        return this._updated_at;
    }
}
