import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../models/user.models';
import {RegisterDto} from '../../auth/dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  public constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  public async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  public async addUser(registerDto: RegisterDto): Promise<User> {
    const saltRounds = 10;
    const password = await bcrypt.hash(registerDto.password, saltRounds)

    return new this.userModel({...registerDto, password}).save();
  }
}
