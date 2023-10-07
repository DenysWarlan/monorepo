import {HttpErrorResponse} from "@angular/common/http";
import {UserDto} from "../dto/user.model.dto";


export class UserData {
  public static readonly type: string =  '[UserData] Load UserData';
}

export class UserDataSuccess {
  public static readonly type: string =  '[UserData] Load UserData Success';

  constructor(public data: UserDto) {}
}

export class UserDataFailure {
  public static readonly type: string =  '[UserData] Load UserData Failure';
  constructor(public error: HttpErrorResponse) {}
}
