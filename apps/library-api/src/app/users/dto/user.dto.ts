import {ApiProperty} from '@nestjs/swagger';


export class UserDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    links?: string[];
}