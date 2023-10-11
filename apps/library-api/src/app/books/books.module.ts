import {Module} from '@nestjs/common';
import {BooksController} from './controller/books.controller';
import {BooksService} from './services/books.service';
import {MongooseModule} from '@nestjs/mongoose';
import {BookSchema} from './models/books.model';
import {UsersModule} from '../users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Books', schema: BookSchema }]), UsersModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
