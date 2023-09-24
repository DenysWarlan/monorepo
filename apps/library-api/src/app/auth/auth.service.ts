import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {RegisterDto} from './register.dto';
import {LoginDto} from './login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && password === user.password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginDto): Promise<{ accessToken: string }> {
    const payload = { email: user.email, password: user.password };
    const success = await this.validateUser(user.email, user.password);

    if (!success) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async register(user: RegisterDto) {
    const res = await this.usersService.addUser(user);
    return { id: res };
  }
}
