import {HttpErrorResponse} from "@angular/common/http";
import {LoggedDto} from '../../dto/logged.model.dto';
import {Credentials} from '../../dto/credentials.model.dto';


export class AuthLogin {
  public static readonly type: string = '[Login] Load Logins';

  constructor(public data: Credentials) {}
}

export class LoginSuccess {
  public static readonly type: string = '[Login] Load Logins Success';

  constructor(public data: LoggedDto) {}
}

export class LoginFailure {
  public static readonly type: string = '[Login] Load Logins Failure';
  constructor(public error: HttpErrorResponse) {}
}

export class Logout {
  public static readonly type: string = '[Logout] Logout Logins';
}
