import {Module} from '@nestjs/common';
import {UsersService} from './services/users.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './models/user.model';
import {UsersController} from './controllers/users.controller';
import {JwtService} from '@nestjs/jwt';
import {JwtUtilService} from './services/jwt-util.service';
import {BookSchema} from '../books/models/books.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }, { name: 'Books', schema: BookSchema }])],
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
