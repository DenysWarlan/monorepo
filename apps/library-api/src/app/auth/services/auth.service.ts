import {Injectable} from '@nestjs/common';
import {UsersService} from '../../users/services/users.service';
import {JwtService} from '@nestjs/jwt';
import {RegisterDto} from '../dto/register.dto';
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
      const { name, email, birthDate, booksIds} = user;

      return {
        name,
        birthDate,
        email,
        booksIds
      };
    }
    
    return null;
  }

  async login(email: string): Promise<Logged | null> {
    const user: User = await this.usersService.findByEmail(email);

    const payload = {
      email,
      sub: {
        name: user.name
      }
    }

    return {
        email,
        accessToken: this.jwtService.sign(payload),
        refreshToken: this.jwtService.sign(payload, {expiresIn: '7d'})
      };
  }

  async register(registerDto: RegisterDto): Promise<{email: string} | {message: string}> {
    const existedUser = await this.usersService.findByEmail(registerDto.email);

    if(existedUser) {
      return {
        message: 'Email already registered'
      };
    }

    const {email}: User = await this.usersService.addUser(registerDto);

    return {
      email
    };
  }


  async refreshToken(email: string): Promise<string> {
    const user: User = await this.usersService.findByEmail(email);

    const payload = {
      email,
      sub: {
        name: user?.name
      }
    }

    return this.jwtService.sign(payload);
  }
}
