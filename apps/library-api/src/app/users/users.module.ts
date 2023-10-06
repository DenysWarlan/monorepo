import {Module} from '@nestjs/common';
import {UsersService} from './services/users.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './models/user.models';
import {UsersController} from './controllers/users.controller';
import {JwtService} from '@nestjs/jwt';
import {JwtUtilService} from './services/jwt-util.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [
    UsersService,
    JwtService,
    JwtUtilService
  ],
  exports: [
    UsersService,
    JwtUtilService
  ],
})
export class UsersModule {}
