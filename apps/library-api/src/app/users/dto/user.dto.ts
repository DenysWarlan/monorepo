import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';


export class UserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiPropertyOptional()
    birthDate: Date;

    @ApiPropertyOptional()
    links: string[];
}