export class SetToken {
  public static readonly type: string =  '[auth] Set token';

  constructor(public data: any) {}
}
export class ClearToken {
  public static readonly type: string =  '[auth] Clear token';

  constructor(public data: any) {}
}
