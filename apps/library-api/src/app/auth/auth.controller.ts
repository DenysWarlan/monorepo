import {AuthService} from './auth.service';
import {Body, Controller, Post} from '@nestjs/common';
import {RegisterDto} from './register.dto';
import {LoginDto} from './login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
