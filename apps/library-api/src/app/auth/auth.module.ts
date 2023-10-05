import {Module} from '@nestjs/common';
import {AuthService} from './services/auth.service';
import {UsersModule} from '../users/users.module';
import {LocalStrategy} from './strategy/local.strategy';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstants} from './consts/consts';
import {JwtStrategy} from './strategy/jwt.strategy';
import {AuthController} from './controllers/auth.controller';
import {PassportModule} from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
