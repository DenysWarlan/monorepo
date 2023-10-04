import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {BookService} from '../services/book.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SearchBook, SearchBookFailure, SearchBookSuccess, UpdatePagination} from '../actions/search.action';
import {Book, Books, Pagination} from '../../index';

export interface IBookState {
    readonly searchLoading: boolean;
    readonly searchSuccess: boolean;
    readonly books: Books;
    readonly searchError: HttpErrorResponse;
    readonly pagination: Pagination;
}

@State<IBookState>({
    name: 'book',
    defaults: {
        pagination: {
            query: '',
            startIndex: 0,
            maxResults: 10,
        },
        searchLoading: false,
        searchSuccess: false,
        searchError: null,
        books: null,
    },
})
@Injectable()
export class BookState {
    constructor(
        private bookService: BookService,
    ) {}



    @Action(SearchBook)
    public search({ dispatch, patchState, getState }: StateContext<IBookState>, { data }: SearchBook): Observable<void | Observable<void>> {
        const pagination: Pagination = {
            query: data.query ?? getState().pagination.query,
            startIndex: data.startIndex ?? getState().pagination.startIndex,
            maxResults: data.maxResults ?? getState().pagination.maxResults,
        }
        patchState({
            searchLoading: true,
            searchSuccess: false,
            searchError: null,
            pagination
        });

        return this.bookService.getBooks(pagination).pipe(
            map((data: Books) => dispatch(new SearchBookSuccess(data))),
            catchError((error: HttpErrorResponse) => dispatch(new SearchBookFailure(error)))
        );
    }

    @Action(UpdatePagination)
    public updatePagination(
        { patchState, dispatch, getState }: StateContext<IBookState>,
        { data }: UpdatePagination
    ): void {
        patchState({
            pagination: {
                query: data.query ?? getState().pagination.query,
                startIndex: data.startIndex ?? getState().pagination.startIndex,
                maxResults: data.maxResults ?? getState().pagination.maxResults,
            }
        });

        dispatch(new SearchBook(data))
    }

    @Action(SearchBookSuccess)
    public searchSuccess(
        { patchState }: StateContext<IBookState>,
        { data }: SearchBookSuccess
    ): void {
        patchState({
            searchLoading: false,
            searchSuccess: true,
            books: data,
        });
    }

    @Action(SearchBookFailure)
    public searchFailure(
        { patchState }: StateContext<IBookState>,
        { error }: SearchBookFailure
    ): void {
        patchState({
            searchLoading: false,
            searchSuccess: false,
            searchError: error
        });
    }

    @Selector()
    public static books({ books }: IBookState): Book[] {
        return books.items;
    }

    @Selector()
    public static totalItems({ books }: IBookState): number {
        return books.totalItems;
    }

    @Selector()
    public static searchSuccess({ searchSuccess }: IBookState): boolean {
        return searchSuccess;
    }

    @Selector()
    public static pagination({ pagination }: IBookState): Pagination {
        return pagination;
    }
}
