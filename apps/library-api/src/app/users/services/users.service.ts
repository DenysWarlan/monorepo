import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../models/user.model';
import * as bcrypt from 'bcrypt';
import {UpdateUserDto} from '../dto/update-user.dto';
import {RegisterDto} from '../../auth/dto/register.dto';
import {UserDto} from '../dto/user.dto';
import {DeleteResult} from 'mongodb';
import {BookDto} from '../../books/dto/book.dto';
import {Book} from '../../books/models/books.model';

@Injectable()
export class UsersService {
  public constructor(
      @InjectModel('Users') private readonly userModel: Model<User>,
      @InjectModel('Books') private readonly bookModel: Model<Book>,
  ) {}

  public async findByEmail(email: string): Promise<User> {
    const user: User = await this.userModel.findOne({ email }).exec();

    return user;
  }

  public async updateUser(user: UpdateUserDto): Promise<UserDto> {
    const oldUser: User = await this.findByEmail(user.email);

    const saltRounds: number = 10;

    const password: string = !!user?.password
    ? await bcrypt.hash(user.password, saltRounds)
    : oldUser.password;

      await this.userModel.updateOne({email: user.email}, {
      name: user?.name ?? oldUser.name,
      birthDate: user?.birthDate ?? oldUser.birthDate,
      password,
    });

    const { name, email, birthDate, booksIds}: User = await this.findByEmail(user.email);

    return {
      name,
      birthDate,
      email,
      booksIds
    };
  }

  public async addUser(user: RegisterDto): Promise<User> {
    const saltRounds: number = 10;

    const password: string = await bcrypt.hash(user?.password, saltRounds)

    return new this.userModel({...user, password}).save();
  }

  public async deleteUser(email: string): Promise<DeleteResult> {
    const deleteResult: DeleteResult = await this.userModel.deleteOne({email});

    return deleteResult;
  }

  public async books(email: string): Promise<BookDto[]> {
    const books: BookDto[] = await this.getBooksByUser(email);

    return books;
  }


  public async getBooksByUser(email: string): Promise<BookDto[]> {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const {_id}: User = await this.findByEmail(email);

    const books: Book[] = await this.bookModel.find({'userId': _id});

    return books?.length ? books.map(this.mapBookToDto) : [];
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
