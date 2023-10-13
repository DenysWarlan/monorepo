import {HttpErrorResponse} from "@angular/common/http";


export class DeleteUserData {
  public static readonly type: string =  '[DeleteUserData] Load Delete User';
}

export class DeleteUserDataSuccess {
  public static readonly type: string =  '[DeleteUserData] Load Delete User Success';
}

export class DeleteUserDataFailure {
  public static readonly type: string =  '[DeleteUserData] Load Delete User Failure';
  constructor(public error: HttpErrorResponse) {}
}
