import {HttpErrorResponse} from "@angular/common/http";


export class Register {
  public static readonly type: string =  '[Register] Load Registers';

  constructor(public data: any) {}
}

export class RegisterSuccess {
  public static readonly type: string =  '[Register] Load Registers Success';

  constructor(public data: any) {}
}

export class RegisterFailure {
  public static readonly type: string =  '[Register] Load Registers Failure';
  constructor(public error: HttpErrorResponse) {}
}
