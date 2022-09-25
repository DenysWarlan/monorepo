import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './consts';
import { User } from '../users/user.models';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private autheService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: User) {
    console.log('I AM HERE'); // this never gets called.
    const user = await this.autheService.validateUser(
      payload.email,
      payload.password
    );

    if (!user) {
      return new UnauthorizedException();
    }

    return null;
  }
}
