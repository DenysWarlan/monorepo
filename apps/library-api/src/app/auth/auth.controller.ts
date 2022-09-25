import { AuthService } from './auth.service';
import { Controller, Post, Request } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('/register')
  async register(@Request() req) {
    return this.authService.register(req.body);
  }
}
