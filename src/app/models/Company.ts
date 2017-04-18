import {IUser} from './interface/IUser';
import {ICompany} from './interface/ICompany';
export class Company implements ICompany {
    id: number = null;
    name: string = null;
    created_at: Date = null;
    updated_at: Date = null;
    active_till: Date = null;
    author_id: number = null;
    author: IUser = null;
}
