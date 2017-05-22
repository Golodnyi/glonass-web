export interface IAuth {
  email: string;
  password: string;
  remember: boolean;
}

export class Auth implements IAuth {
  email: string;
  password: string;
  remember: boolean;
}
