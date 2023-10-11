import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {PassportModule} from '@nestjs/passport';
import {BooksModule} from './books/books.module';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forRoot(
      'mongodb+srv://Denis:Q0KgYRqTLBPH8RMH@cluster0.e5g4l.mongodb.net/?retryWrites=true&w=majority'
    ),
    UsersModule,
    AuthModule,
    BooksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
