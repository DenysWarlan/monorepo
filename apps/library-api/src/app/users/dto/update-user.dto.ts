import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';


export class UpdateUserDto {
    @ApiPropertyOptional()
    name: string;

    @ApiPropertyOptional()
    email: string;

    @ApiPropertyOptional()
    birthDate: Date;

    @ApiPropertyOptional()
    password: string;

    @ApiPropertyOptional()
    confirmPassword: string;
}