import { Books } from './books.model';
import { Pagination } from './pagination.model';

export interface HistorySearch {
    readonly pagination: Pagination;
    readonly books: Books;
}