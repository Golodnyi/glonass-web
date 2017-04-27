import { IAuth } from './interface/IAuth';
export class Auth implements IAuth {
  email: string;
  password: string;
  remember: boolean;
}
