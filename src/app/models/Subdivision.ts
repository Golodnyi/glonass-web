import {ISubdivision} from './interface/ISubdivision';
export class Subdivision implements ISubdivision {
    id: number = null;
    name: string = null;
    company_id: number = null;
    created_at: Date = null;
    updated_at: Date = null;
    author_id: number = null;
}
