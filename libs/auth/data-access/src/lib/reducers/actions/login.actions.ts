import {HttpErrorResponse} from "@angular/common/http";
import {Login} from '../../models/login.model';


export class AuthLogin {
  public static readonly type: string = '[Login] Load Logins';

  constructor(public data: Login) {}
}

export class LoginSuccess {
  public static readonly type: string = '[Login] Load Logins Success';

  constructor(public data: any) {}
}

export class LoginFailure {
  public static readonly type: string = '[Login] Load Logins Failure';
  constructor(public error: HttpErrorResponse) {}
}

export class Logout {
  public static readonly type: string = '[Logout] Logout Logins';
}
