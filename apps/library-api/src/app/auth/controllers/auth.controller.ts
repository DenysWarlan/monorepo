import {AuthService} from '../services/auth.service';
import {Body, Controller, HttpStatus, Post, Req, Res, UseGuards} from '@nestjs/common';
import {RegisterDto} from '../dto/register.dto';
import {CredentialsDto} from '../dto/credentials.dto';
import {ApiBadRequestResponse, ApiCreatedResponse, ApiExtraModels, ApiResponse} from '@nestjs/swagger';
import {LoggedDto} from '../dto/logged.dto';
import {Response} from 'express';
import {LocalAuthGuard} from '../guards/local-auth.guard';
import {RefreshJwtAuthGuard} from '../guards/refresh-jwt-auth.guard';
import {JwtUtilService} from '../../users/services/jwt-util.service';

@Controller('auth/')
export class AuthController {
  public constructor(
      private readonly authService: AuthService,
      private readonly jwtUtil: JwtUtilService
  ) {}

  @Post('login')
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
  @UseGuards(LocalAuthGuard)
  async login(@Res() response: Response, @Body() {email}: CredentialsDto): Promise<LoggedDto> {
    const login: LoggedDto = await this.authService.login(email);

    if(!!login) {
      response.status(HttpStatus.OK).send(login);

      return;
    }


    response.status(HttpStatus.BAD_REQUEST).send({
      message: 'Invalid credentials.'
    });

    return;
  }

  @Post('register')
  @ApiCreatedResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'No content',
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data'
  })
  async register(@Res({passthrough: true}) response: Response, @Body() registerDto: RegisterDto) {
    const logged: {email: string} | {message: string} = await this.authService.register(registerDto);

    if(logged.hasOwnProperty('message')) {
      response.status(HttpStatus.BAD_REQUEST).send(logged)

      return;
    }

    if (logged.hasOwnProperty('email')) {
      response.status(HttpStatus.NO_CONTENT).send('');

      return;
    }

    response.status(HttpStatus.BAD_REQUEST).send({})

    return;
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Req() req: Request, @Res() response: Response): Promise<string> {
    const json = this.jwtUtil.decode(req);

    const refreshedToken: string = await this.authService.refreshToken(json.email);

    response.status(HttpStatus.OK).send({refreshedToken});

    return;

  }
}
