import {Body, Controller, Delete, Get, HttpStatus, Post, Req, Res, UseGuards,} from '@nestjs/common';
import {UsersService} from '../services/users.service';
import {UserDto} from '../dto/user.dto';
import {ApiExtraModels, ApiHeader, ApiResponse, ApiTags} from '@nestjs/swagger';
import {JwtUtilService} from '../services/jwt-util.service';
import {JwtAuthGuard} from '../../auth/guards/jwt-auth.guard';
import {UpdateUserDto} from '../dto/update-user.dto';
import {Response} from 'express';
import {ErrorResponseDto} from '../../auth/dto/error-response.dto';
import {DeleteResult} from 'mongodb';
import {User} from '../models/user.model';
import {BookDto} from '../../books/dto/book.dto';

@ApiTags('User')
@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private jwtUtil: JwtUtilService
  ) {}

  @ApiExtraModels(UserDto)
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async getProfile(
      @Req() request: Request,
      @Res() response: Response
  ): Promise<UserDto | ErrorResponseDto> {

    const json: { email: string; sub: { name: string } } =
      this.jwtUtil.decode(request);

    const user: User =
      await this.usersService.findByEmail(json.email);

    if(!user) {
      response.status(HttpStatus.NOT_FOUND).send({message: 'User not found'});

      return;
    }

    const { name, email, birthDate, booksIds }: User = user;

    response.status(HttpStatus.OK).send({
      name,
      birthDate,
      email,
      booksIds,
    })

    return;
  }

  @ApiExtraModels(UpdateUserDto)
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserDto
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto
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
  ): Promise<UserDto | ErrorResponseDto> {

    if (!user.email) {
      response.status(HttpStatus.BAD_REQUEST).send({message:'Email not found'});

      return;
    }

    response.status(HttpStatus.OK).send(this.usersService.updateUser(user));

    return;
  }

  @ApiExtraModels(UpdateUserDto)
  @ApiResponse({
    status: 201,
    description: 'No content',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @UseGuards(JwtAuthGuard)
  @Delete('/me')
  async deleteProfile(
      @Req() request: Request,
      @Res() response: Response
  ): Promise<DeleteResult> {
    const json: { email: string; sub: { name: string } } = this.jwtUtil.decode(request);

    return this.usersService.deleteUser(json.email);
  }

  @ApiExtraModels(UpdateUserDto)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [BookDto]
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ErrorResponseDto
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'JWT token',
  })
  @UseGuards(JwtAuthGuard)
  @Get('/me/books')
  async books(
      @Req() request: Request,
      @Res() response: Response
  ): Promise<BookDto[]> {
    const json: { email: string; sub: { name: string } } = this.jwtUtil.decode(request);

    const books: BookDto[] = await this.usersService.books(json.email);

    if(!books) {
      response.status(HttpStatus.BAD_REQUEST).send({message: 'Somthing error'});

      return ;
    }

    response.status(HttpStatus.OK).send(books);

    return;
  }
}