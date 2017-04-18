import {IAuth} from './interface/IAuth';
export class Auth implements IAuth {
    email: string = null;
    password: string = null;
    remember: boolean = null;
}
