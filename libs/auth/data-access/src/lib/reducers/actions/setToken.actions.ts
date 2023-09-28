import {LoggedDto} from '../../dto/logged.model.dto';

export class SetToken {
  public static readonly type: string =  '[auth] Set token';

  constructor(public data: LoggedDto) {}
}
export class ClearToken {
  public static readonly type: string =  '[auth] Clear token';
}
