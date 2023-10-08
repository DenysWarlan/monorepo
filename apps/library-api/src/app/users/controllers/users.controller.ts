import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Post,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common';
import {UsersService} from '../services/users.service';
import {UserDto} from '../dto/user.dto';
import {ApiExtraModels, ApiHeader, ApiResponse, getSchemaPath} from '@nestjs/swagger';
import {JwtUtilService} from '../services/jwt-util.service';
import {JwtAuthGuard} from '../../auth/guards/jwt-auth.guard';
import { UpdateUserDto } from '../dto/update-user.dto';
import {Response} from 'express';

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
  async getProfile(@Req() request: Request): Promise<UserDto> {
    const json: { email: string; sub: { name: string } } =
      this.jwtUtil.decode(request);
    const { name, email, birthDate, booksIds } =
      await this.usersService.findByEmail(json.email);

    return {
      name,
      birthDate,
      email,
      booksIds,
    };
  }

  @ApiExtraModels(UpdateUserDto)
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
      $ref: getSchemaPath(UserDto),
    },
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @UseGuards(JwtAuthGuard)
  @Post('/me')
  async updateProfile(
    @Res() response: Response,
    @Body() user: UpdateUserDto
  ): Promise<UserDto> {
    if (!user.email) {
      response.status(HttpStatus.BAD_REQUEST).send({message:'Email not found'});

      return;
    }
    const updatedUser: UserDto = await this.usersService.updateUser(user)

    response.status(HttpStatus.OK).send(updatedUser);

    return;
  }
}