import {BookDto} from './book.dto';

export interface BookDetailsDto extends BookDto{
    readonly bookId: string;
    readonly title:	string;
    readonly authors: string[];
    readonly description: string;
    readonly categories: string[];
    readonly thumbnail:	string;
    readonly publisher: string;
    readonly pageCount: number;
    readonly publisherDate: string;
    readonly link: string;
    readonly language: string;
    readonly isFavorite?: boolean;
}