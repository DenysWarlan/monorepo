import {AuthService} from './auth.service';
import {Body, Controller, Get, Post} from '@nestjs/common';
import {RegisterDto} from './register.dto';
import {LoginDto} from './login.dto';
import {UsersService} from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
      private readonly authService: AuthService,
      private readonly usersService: UsersService
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Get('/login')
  async getLogin() {
    return this.usersService.findAll();
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
