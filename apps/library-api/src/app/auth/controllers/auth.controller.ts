import {AuthService} from '../services/auth.service';
import {Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import {RegisterDto} from '../dto/register.dto';
import {CredentialsDto} from '../dto/credentials.dto';
import {ApiBadRequestResponse, ApiCreatedResponse, ApiExtraModels, ApiResponse} from '@nestjs/swagger';
import {LoggedDto} from '../dto/logged.dto';
import {Logged} from '../models/logged.model';
import {Response} from 'express';

@Controller('auth')
export class AuthController {
  public constructor(
      private readonly authService: AuthService
  ) {}

  @Post('/login')
  @ApiExtraModels(LoggedDto)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The record has been successfully created.',
    type: LoggedDto
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid credentials.',
  })
  async login(@Res({passthrough: true}) response: Response, @Body() loginDto: CredentialsDto): Promise<LoggedDto> {

    const login: LoggedDto = await this.authService.login(loginDto);

    if(!!login) {
      response.status(HttpStatus.OK).send(login);

      return login;
    }


    response.status(HttpStatus.BAD_REQUEST).send({
      message: 'Invalid credentials.'
    });

    return;
  }

  @Post('/register')
  @ApiCreatedResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'No content',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data'
  })
  async register(@Res({passthrough: true}) response: Response, @Body() registerDto: RegisterDto) {
    const logged: Logged | {message: string} = await this.authService.register(registerDto);

    if(logged.hasOwnProperty('message')) {
      response.status(HttpStatus.BAD_REQUEST).send(logged)

      return;
    }

    if (logged.hasOwnProperty('id')) {
      response.status(HttpStatus.NO_CONTENT).send('');

      return;
    }

    response.status(HttpStatus.BAD_REQUEST).send({})

    return;
  }
}
