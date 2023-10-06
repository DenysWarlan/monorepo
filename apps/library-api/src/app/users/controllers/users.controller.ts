import {Controller, Get, Logger, Req, UseGuards} from '@nestjs/common';
import {UsersService} from '../services/users.service';
import {UserDto} from '../dto/user.dto';
import {User} from '../models/user.models';
import {ApiExtraModels, ApiHeader, ApiResponse, getSchemaPath} from '@nestjs/swagger';
import {JwtUtilService} from '../services/jwt-util.service';
import {JwtAuthGuard} from '../../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(
      private usersService: UsersService,
      private jwtUtil: JwtUtilService
  ) {}

  @ApiExtraModels(UserDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(UserDto),
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getProfile(@Req() request: Request): Promise<User> {
    Logger.log(request.url)
    const json:  { email: string, sub: {name: string} }  = this.jwtUtil.decode(request);

    return this.usersService.findByEmail(json.email);
  }
}