import {Book} from './book.model';

export interface Books {
    readonly kind: string;
    readonly totalItems: number;
    readonly items: Book[];
}

