import {ApiProperty} from '@nestjs/swagger';

export class LoggedDto {
    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly accessToken: string;
}