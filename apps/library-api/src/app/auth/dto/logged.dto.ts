import {ApiProperty} from '@nestjs/swagger';

export class LoggedDto {
    @ApiProperty()
    readonly id: number;

    @ApiProperty()
    readonly accessToken: string;
}