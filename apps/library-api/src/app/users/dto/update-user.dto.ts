import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';


export class UpdateUserDto {
    @ApiProperty()
    email: string;

    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    birthDate: Date;

    @ApiPropertyOptional()
    password: string;

    @ApiPropertyOptional()
    confirmPassword: string;
}