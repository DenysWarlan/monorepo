import {Injectable} from '@nestjs/common';
import {UsersService} from '../../users/services/users.service';
import {JwtService} from '@nestjs/jwt';
import {RegisterDto} from '../dto/register.dto';
import {CredentialsDto} from '../dto/credentials.dto';
import {User} from '../../users/models/user.models';
import {Logged} from '../models/logged.model';
import * as bcrypt from 'bcrypt';
import {UserDto} from '../../users/dto/user.dto';

@Injectable()
export class AuthService {

  public constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<UserDto> {
    const user: User = await this.usersService.findByEmail(email);
    
    if (user && await (bcrypt.compare(password, user.password))) {
      const { _id, name, email, birthDate, links} = user;

      return {
        id: _id,
        name,
        birthDate,
        email,
        links
      };
    }
    
    return null;
  }

  async login({email, password}: CredentialsDto): Promise<Logged | null> {
    return {
        email,
        accessToken: this.jwtService.sign({email, password}),
      };
  }

  async register(registerDto: RegisterDto): Promise<Logged | {message: string}> {
    const existedUser = await this.usersService.findByEmail(registerDto.email);

    if(existedUser) {
      return {
        message: 'Email already registered'
      };
    }

    const {password, email}: User = await this.usersService.addUser(registerDto);

    return {
      email,
      accessToken: this.jwtService.sign({email, password})
    };
  }
}
