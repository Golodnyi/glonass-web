import {IUser} from './IUser';
import {ICompany} from './ICompany';
export interface ISubdivision {
    id: number;
    name: string;
    company_id: number;
    company: ICompany;
    created_at: Date;
    updated_at: Date;
    author_id: number;
    author: IUser;
}
