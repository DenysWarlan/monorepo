import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class BookDto {
    @ApiProperty()
    readonly bookId: string;

    @ApiProperty()
    readonly title: string;

    @ApiProperty()
    readonly authors: string[];

    @ApiPropertyOptional()
    readonly publisher: string;

    @ApiPropertyOptional()
    readonly description: string;

    @ApiPropertyOptional()
    readonly categories: string[];

    @ApiPropertyOptional()
    readonly thumbnail: string;
}