import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {GoogleBookService} from '../services/google-book.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ResetBooks, SearchBook, SearchBookFailure, SearchBookSuccess, UpdatePagination} from '../actions/search.action';
import {Pagination} from '../../index';
import {BookDetails, BookDetailsFailure, BookDetailsSuccess} from '../actions/book-details.action';
import {RequestStatus} from '../../model/request-status.model';
import {BookListDto} from '../../dto/book-list.dto';
import {BookDto} from '../../dto/book.dto';
import {BookDetailsDto} from '../../dto/book-details.dto';

export interface IBookState {
    readonly searchStatus: RequestStatus;
    readonly detailsStatus: RequestStatus;
    readonly addToFavoriteStatus: RequestStatus;
    readonly pagination: Pagination;
    readonly books: BookListDto;
    readonly book: BookDetailsDto;
}

@State<IBookState>({
    name: 'book',
    defaults: {
        pagination: {
            query: '',
            startIndex: 0,
            pageIndex: 0,
            maxResults: 8,
        },
        searchStatus: {
            loading: false,
            success: false,
            error: null,
        },
        detailsStatus: {
            loading: false,
            success: false,
            error: null,
        },
        addToFavoriteStatus: {
            loading: false,
            success: false,
            error: null,
        },
        books: null,
        book: null,
    },
})
@Injectable()
export class BookState {
    constructor(
        private googleBookService: GoogleBookService,
    ) {}

    @Action(SearchBook)
    public search({ dispatch, patchState, getState }: StateContext<IBookState>, { data }: SearchBook): Observable<void | Observable<void>> {
        const pagination: Pagination = {
            query: data.query ?? getState().pagination.query,
            startIndex: data.startIndex ?? getState().pagination.startIndex,
            pageIndex: data.pageIndex ?? getState().pagination.pageIndex,
            maxResults: data.maxResults ?? getState().pagination.maxResults,
        }

        patchState({
            searchStatus: {
                loading: true,
                success: false,
                error: null,
            },
            pagination
        });

        return this.googleBookService.getBooks(pagination).pipe(
            map((data: BookListDto) => dispatch(new SearchBookSuccess(data))),
            catchError((error: HttpErrorResponse) => dispatch(new SearchBookFailure(error)))
        );
    }

    @Action(SearchBookSuccess)
    public searchSuccess(
        { patchState }: StateContext<IBookState>,
        { data }: SearchBookSuccess
    ): void {
        patchState({
            searchStatus: {
                loading: false,
                success: true,
                error: null
            },
            books: data,
        });
    }

    @Action(SearchBookFailure)
    public searchFailure(
        { patchState }: StateContext<IBookState>,
        { error }: SearchBookFailure
    ): void {
        patchState({
            searchStatus: {
                loading: false,
                success: false,
                error
            }
            });
    }

    @Action(BookDetails)
    public details(
        { dispatch, patchState }: StateContext<IBookState>,
        { data }: BookDetails): Observable<void | Observable<void>>
    {
        patchState({
            detailsStatus: {
                loading: true,
                success: false,
                error: null
            },
            book: null
        });

        return this.googleBookService.getBook(data).pipe(
            map((data: BookDetailsDto) => dispatch(new BookDetailsSuccess(data))),
            catchError((error: HttpErrorResponse) => dispatch(new BookDetailsFailure(error)))
        );
    }

    @Action(BookDetailsSuccess)
    public detailsSuccess(
        { patchState }: StateContext<IBookState>,
        { data }: BookDetailsSuccess
    ): void {
        patchState({
            detailsStatus: {
                loading: false,
                success: true,
                error: null
            },
            book: data
        });
    }

    @Action(BookDetailsFailure)
    public detailsFailure(
        { patchState }: StateContext<IBookState>,
        { error }: SearchBookFailure
    ): void {
        patchState({
            detailsStatus: {
                loading: false,
                success: false,
                error
            },
        });
    }

    @Action(ResetBooks)
    public resetBooks(
        { patchState }: StateContext<IBookState>,
    ): void {
        patchState({
            books: null,
            pagination: {
                query: '',
                startIndex: 0,
                maxResults: 8
            },
            searchStatus: {
                success: false,
                loading: false,
                error: null
            }
        });
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
                pageIndex: data.pageIndex ?? getState().pagination.pageIndex,
                maxResults: data.maxResults ?? getState().pagination.maxResults,
            }
        });

        dispatch(new SearchBook(data))
    }

    @Selector()
    public static books({ books }: IBookState): BookDto[] {
        return books.items;
    }

    @Selector()
    public static totalItems({ books }: IBookState): number {
        return books.totalItems;
    }

    @Selector()
    public static searchSuccess({ searchStatus }: IBookState): boolean {
        return searchStatus.success;
    }

    @Selector()
    public static searchLoading({ searchStatus }: IBookState): boolean {
        return searchStatus.loading;
    }

    @Selector()
    public static pagination({ pagination }: IBookState): Pagination {
        return pagination;
    }

    @Selector()
    public static book({ book }: IBookState): BookDetailsDto {
        return book;
    }
}
