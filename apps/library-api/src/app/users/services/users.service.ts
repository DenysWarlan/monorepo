import {Injectable, Logger} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {User} from '../models/user.models';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from '../dto/update-user.dto';
import { RegisterDto } from '../../auth/dto/register.dto';

@Injectable()
export class UsersService {
  public constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  public async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  public async updateUser(user: UpdateUserDto): Promise<User> {
    const oldUser: User = await this.findByEmail(user.email);

    const saltRounds = 10;

    const password = user.password ? await bcrypt.hash(user.password, saltRounds) : oldUser.password;

    await this.userModel.updateOne({email: user.email}, {
      name: user.name ?? oldUser.name,
      birthDate: user.birthDate ?? oldUser.birthDate,
      password,
    });

    return this.findByEmail(user.email);
  }

  public async addUser(user: RegisterDto): Promise<User> {
    const saltRounds = 10;
    const password = await bcrypt.hash(user?.password, saltRounds)

    return new this.userModel({...user, password}).save();
  }
}
