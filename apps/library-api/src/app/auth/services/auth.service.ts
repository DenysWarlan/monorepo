import {HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../../users/services/users.service';
import {JwtService} from '@nestjs/jwt';
import {RegisterDto} from '../dto/register.dto';
import {CredentialsDto} from '../dto/credentials.dto';
import {User} from '../../users/models/user.models';
import {UserCredentials} from '../models/user-credentials.model';
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

  async login(loginDto: CredentialsDto): Promise<Logged | null> {
    const payload: UserCredentials = { email: loginDto.email, password: loginDto.password };
    const validUser: User | null  = await this.validateUser(loginDto.email, loginDto.password);

    return validUser
    ? {
        id: validUser._id.toString(),
        accessToken: this.jwtService.sign(payload),
      }
    : null;
  }

  async register(registerDto: RegisterDto): Promise<Logged> {
    const {_id, password, email}: User = await this.usersService.addUser(registerDto);

    return {
      id: _id.toString(),
      accessToken: this.jwtService.sign({email, password})
    };
  }
}
