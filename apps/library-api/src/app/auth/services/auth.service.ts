import {Injectable} from '@nestjs/common';
import {UsersService} from '../../users/services/users.service';
import {JwtService} from '@nestjs/jwt';
import {RegisterDto} from '../dto/register.dto';
import {CredentialsDto} from '../dto/credentials.dto';
import {User} from '../../users/models/user.models';
import {Logged} from '../models/logged.model';

@Injectable()
export class AuthService {

  public constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findByEmail(email);
    
    if (user && password === user.password) {
      return user;
    }
    
    return null;
  }

  async login({email, password}: CredentialsDto): Promise<Logged | null> {
    const validUser: User | null  = await this.validateUser(email, password);

    return validUser
    ? {
        id: validUser._id.toString(),
        accessToken: this.jwtService.sign({email, password}),
      }
    : null;
  }

  async register(registerDto: RegisterDto): Promise<Logged | {message: string}> {
    const existedUser = await this.usersService.findByEmail(registerDto.email);

    if(existedUser) {
      return {
        message: 'Email already registered'
      };
    }

    const {_id, password, email}: User = await this.usersService.addUser(registerDto);

    return {
      id: _id.toString(),
      accessToken: this.jwtService.sign({email, password})
    };
  }
}
