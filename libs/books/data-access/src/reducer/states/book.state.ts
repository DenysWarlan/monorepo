import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {BookService} from '../services/book.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ResetBooks, SearchBook, SearchBookFailure, SearchBookSuccess, UpdatePagination} from '../actions/search.action';
import {Book, Books, Pagination} from '../../index';
import {HistorySearch} from "../../model/history-search.model";
import {isEqual} from "lodash";

export interface IBookState {
    readonly searchLoading: boolean;
    readonly searchSuccess: boolean;
    readonly books: Books;
    readonly searchError: HttpErrorResponse;
    readonly pagination: Pagination;
    readonly historySearchs: HistorySearch[];
}

@State<IBookState>({
    name: 'book',
    defaults: {
        pagination: {
            query: '',
            startIndex: 0,
            maxResults: 8,
        },
        searchLoading: false,
        searchSuccess: false,
        searchError: null,
        books: null,
        historySearchs: []
    },
})
@Injectable()
export class BookState {
    constructor(
        private bookService: BookService
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

        const historySearch: HistorySearch = getState()
        .historySearchs.find((historySearch: HistorySearch) => isEqual(historySearch.pagination, pagination));

        if(historySearch) {
            return dispatch(new SearchBookSuccess(historySearch.books));
        }

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
        { patchState, getState }: StateContext<IBookState>,
        { data }: SearchBookSuccess
    ): void {
        const newHistorySearch: HistorySearch = {
            pagination: getState().pagination,
            books: data
        };

        const historySearchs: HistorySearch[] = [...getState().historySearchs, newHistorySearch]

        patchState({
            searchLoading: false,
            searchSuccess: true,
            books: data,
            historySearchs
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

    @Action(ResetBooks)
    public resetBooks(
        { patchState }: StateContext<IBookState>,
    ): void {
        patchState({
            books: null,
            searchSuccess: false
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
    public static searchLoading({ searchLoading }: IBookState): boolean {
        return searchLoading;
    }

    @Selector()
    public static pagination({ pagination }: IBookState): Pagination {
        return pagination;
    }
}
