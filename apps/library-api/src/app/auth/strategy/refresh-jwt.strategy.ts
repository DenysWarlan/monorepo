import {ExtractJwt, Strategy} from 'passport-jwt';
import {PassportStrategy} from '@nestjs/passport';
import {Injectable} from '@nestjs/common';
import {jwtConstants} from '../consts/consts';

@Injectable()
export class RefreshJWTStrategy extends PassportStrategy(Strategy, 'jwt-refresh-token') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(email: string): Promise<string> {
       return email;
  }
}
