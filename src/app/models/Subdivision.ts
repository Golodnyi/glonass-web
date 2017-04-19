import {ISubdivision} from './interface/ISubdivision';
import * as moment from 'moment';
export class Subdivision implements ISubdivision {
    id: number;
    name: string;
    company_id: number;
    author_id: number;
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
