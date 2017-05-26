export interface IAuth {
  email: string;
  password: string;
  remember: boolean;
}

export class Auth implements IAuth {
  public email: string;
  public password: string;
  public remember: boolean;
}
