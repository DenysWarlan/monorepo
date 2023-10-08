import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';


export class UserDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiPropertyOptional()
    birthDate: string;

    @ApiPropertyOptional()
    booksIds: string[];
}