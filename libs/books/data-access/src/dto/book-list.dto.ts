import {BookDto} from './book.dto';

export interface BookListDto {
    readonly items: BookDto[];
    readonly kind: string;
    readonly totalItems: number;
}