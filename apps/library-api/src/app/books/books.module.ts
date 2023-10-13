import {Module} from '@nestjs/common';
import {BooksController} from './controller/books.controller';
import {BooksService} from './services/books.service';
import {MongooseModule} from '@nestjs/mongoose';
import {BookSchema} from './models/books.model';
import {UserSchema} from '../users/models/user.model';
import {JwtUtilService} from '../users/services/jwt-util.service';
import {JwtService} from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Books', schema: BookSchema }, { name: 'Users', schema: UserSchema }]) ],
  controllers: [BooksController],
  providers: [BooksService, JwtUtilService, JwtService],
})
export class BooksModule {}
