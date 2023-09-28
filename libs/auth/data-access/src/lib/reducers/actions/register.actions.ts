import {HttpErrorResponse} from "@angular/common/http";
import {RegisterDto} from '../../dto/register.model.dto';


export class Register {
  public static readonly type: string =  '[Register] Load Registers';

  constructor(public data: RegisterDto) {}
}

export class RegisterSuccess {
  public static readonly type: string =  '[Register] Load Registers Success';
}

export class RegisterFailure {
  public static readonly type: string =  '[Register] Load Registers Failure';
  constructor(public error: HttpErrorResponse) {}
}
