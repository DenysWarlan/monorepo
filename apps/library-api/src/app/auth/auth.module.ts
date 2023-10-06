import {Module} from '@nestjs/common';
import {AuthService} from './services/auth.service';
import {UsersModule} from '../users/users.module';
import {LocalStrategy} from './strategy/local.strategy';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './consts/consts';
import {JwtStrategy} from './strategy/jwt.strategy';
import {AuthController} from './controllers/auth.controller';
import {PassportModule} from '@nestjs/passport';
import {RefreshJWTStrategy} from './strategy/refresh-jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshJWTStrategy
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
