import { Injectable } from '@nestjs/common';
import {Book} from '../models/books.model';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../../users/models/user.model';
import {UsersService} from '../../users/services/users.service';
import {DeleteResult} from 'mongodb';
import {BookDto} from '../dto/book.dto';

@Injectable()
export class BooksService {

    public constructor(
        @InjectModel('Books') private readonly bookModel: Model<Book>,
        private userService: UsersService
    ) {}

    public async add(book: BookDto, email: string): Promise<Book> {
        const {_id}: User = await this.userService.findByEmail(email);

        return new this.bookModel({...book, userId: _id}).save();
    }

    public async getBookById(id: string): Promise<BookDto> {
        const book: Book = await this.bookModel.findById(id);

        return this.mapBookToDto(book);
    }

    public async removeById(id: string): Promise<DeleteResult> {
        return this.bookModel.deleteOne({_id: id});
    }

    private mapBookToDto({_id, title, authors, publisher, description, categories, thumbnail}: Book): BookDto {
        return {
            id: _id,
            title,
            description,
            authors,
            categories,
            publisher,
            thumbnail
        }
    }
}
