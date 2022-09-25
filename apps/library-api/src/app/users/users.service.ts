import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.models';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}
  async findOne(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findAll(): Promise<User[]> {
    const result = await this.userModel.find();

    return result;
  }

  async addUser(user: User): Promise<number> {
    const newUser = new this.userModel({
      email: user.email,
      password: user.password,
    });
    const result = await newUser.save();

    return result.id as number;
  }
}
