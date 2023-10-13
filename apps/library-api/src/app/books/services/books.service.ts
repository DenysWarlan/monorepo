import {Injectable} from '@nestjs/common';
import {Book} from '../models/books.model';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../../users/models/user.model';
import {DeleteResult} from 'mongodb';
import {BookDto} from '../dto/book.dto';

@Injectable()
export class BooksService {

    public constructor(
        @InjectModel('Books') private readonly bookModel: Model<Book>,
        @InjectModel('Users') private readonly userModel: Model<User>,
    ) {}

    public async add(book: BookDto, email: string): Promise<BookDto[]> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const user: User = await this.userModel.findOne({email});

       await new this.bookModel({...book, userId: user._id.toString()}).save();

        return this.getBooksByUser(user._id);
    }

    public async getBookById(id: string): Promise<BookDto> {
        const book: Book = await this.bookModel.findById(id);

        return this.mapBookToDto(book);
    }

    public async removeById(id: string, email: string): Promise<BookDto[]> {
        const user: User = await this.userModel.findOne({email});

        const deleteResult: DeleteResult = await this.bookModel.deleteOne({bookId: id, userId: user._id.toString()});

        await this.bookModel.find({'userId': user._id});

        return !!deleteResult.deletedCount ? this.getBooksByUser(user._id) : [];
    }

    private mapBookToDto({bookId, title, authors, publisher, description, categories, thumbnail}: Book): BookDto {
        return {
            bookId,
            title,
            description,
            authors,
            categories,
            publisher,
            thumbnail
        }
    }



    public async getBooksByUser(userId: string): Promise<BookDto[]> {
        const books: Book[] = await this.bookModel.find({userId});

        return books?.length ? books.map(this.mapBookToDto) : [];
    }
}
