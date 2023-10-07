import {HttpErrorResponse} from "@angular/common/http";
import {UserDto} from "../dto/user.model.dto";
import {UpdateUserDto} from "../dto/update-user.model.dto";


export class UpdateUserData {
  public static readonly type: string =  '[UpdateUserData] Load Update UserData';

  constructor(public data: UpdateUserDto) {}
}

export class UpdateUserDataSuccess {
  public static readonly type: string =  '[UpdateUserData] Load Update UserData Success';

  constructor(public data: UserDto) {}
}

export class UpdateUserDataFailure {
  public static readonly type: string =  '[UpdateUserData] Load Update UserData Failure';
  constructor(public error: HttpErrorResponse) {}
}
