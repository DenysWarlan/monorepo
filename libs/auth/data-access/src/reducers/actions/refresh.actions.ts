import {HttpErrorResponse} from "@angular/common/http";


export class Refresh {
  public static readonly type: string =  '[Refresh] Load Refresh';
}

export class RefreshSuccess {
  public static readonly type: string =  '[Refresh] Load Refresh Success';

  constructor(public data: string) {}
}

export class RefreshFailure {
  public static readonly type: string =  '[Refresh] Load Refresh Failure';
  constructor(public error: HttpErrorResponse) {}
}
