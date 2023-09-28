import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.models';
import {RegisterDto} from '../../auth/dto/register.dto';
import {UserDto} from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}
  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findOne({ id }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async addUser(registerDto: RegisterDto): Promise<User> {
    const newUser: User = new this.userModel({
      email: registerDto.email,
      password: registerDto.password,
    });

    return newUser.save();
  }
}
