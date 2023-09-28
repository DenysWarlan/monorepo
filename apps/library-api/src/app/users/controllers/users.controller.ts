import {Body, Controller, Get} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import {UserDto} from '../dto/user.dto';
import {User} from '../models/user.models';
import {ApiExtraModels, ApiResponse, getSchemaPath} from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiExtraModels(UserDto)
  @ApiResponse({
    status: 200,
    schema: {
      $ref: getSchemaPath(UserDto),
    },
  })
  @Get('/:id')
  getProfile(@Body() id: string): Promise<User> {
    return this.usersService.findById(id);
  }
}
