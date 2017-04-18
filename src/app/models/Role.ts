import {IRole} from './interface/IRole';
export class Role implements IRole {
    id: number = null;
    name: string = null;
    is_global: number = null;
}
