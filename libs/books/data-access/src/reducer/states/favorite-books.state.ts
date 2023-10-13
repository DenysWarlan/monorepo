import {Action, createSelector, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SearchBookFailure, UpdatePagination} from '../actions/search.action';
import {AddToFavorite, AddToFavoriteFailure, AddToFavoriteSuccess, Pagination} from '../../index';
import {RequestStatus} from '../../model/request-status.model';
import {BookService} from '../services/book.service';
import {BookDto} from '../../dto/book.dto';
import {FavoriteBooksFailure, FavoriteBooksSuccess, GetFavoriteBooks} from '../actions/favorite-books.action';
import {
    RemoveFromFavorite,
    RemoveFromFavoriteFailure,
    RemoveFromFavoriteSuccess
} from '../actions/remove-book-favorite.action';
import {IBookState} from './book.state';

export interface FavoriteBooks {
    readonly addBookToFavoriteStatus: RequestStatus;
    readonly getFavoriteBooksStatus: RequestStatus;
    readonly removeFavoriteBookStatus: RequestStatus;
    readonly favoriteBooks: BookDto[];
    readonly pagination: Pagination;
}

@State<FavoriteBooks>({
    name: 'favoriteBooks',
    defaults: {
        addBookToFavoriteStatus: {
            loading: false,
            success: false,
            error: null,
        },
        getFavoriteBooksStatus: {
            loading: false,
            success: false,
            error: null,
        },
        removeFavoriteBookStatus: {
            loading: false,
            success: false,
            error: null,
        },
        favoriteBooks: [],
        pagination: {
            query: '',
            startIndex: 0,
            maxResults: 8,
        },
    },
})
@Injectable()
export class FavoriteBookState {
    public constructor(
        private bookService: BookService
    ) {}


    @Action(AddToFavorite)
    public add(
        { dispatch, patchState }: StateContext<FavoriteBooks>,
        { data }: AddToFavorite): Observable<void | Observable<void>>
    {
        patchState({
            addBookToFavoriteStatus: {
                loading: true,
                success: false,
                error: null
            },
        });

        return this.bookService.add(data).pipe(
            map((data: BookDto[]) => dispatch(new AddToFavoriteSuccess(data))),
            catchError((error: HttpErrorResponse) => dispatch(new AddToFavoriteFailure(error)))
        );
    }

    @Action(AddToFavoriteSuccess)
    public addSuccess(
        { patchState }: StateContext<FavoriteBooks>,
        {data}: AddToFavoriteSuccess
    ): void {
        patchState({
            addBookToFavoriteStatus: {
                loading: false,
                success: true,
                error: null
            },
            favoriteBooks: data
        });
    }

    @Action(AddToFavoriteFailure)
    public addFailure(
        { patchState }: StateContext<FavoriteBooks>,
        { error }: SearchBookFailure
    ): void {
        patchState({
            addBookToFavoriteStatus: {
                loading: false,
                success: false,
                error
            },
        });
    }

    @Action(GetFavoriteBooks)
    public favoriteBooks(
        { dispatch, patchState, getState }: StateContext<FavoriteBooks>,
        {data}: GetFavoriteBooks
    ): Observable<void | Observable<void>>
    {
        patchState({
            getFavoriteBooksStatus: {
                loading: true,
                success: false,
                error: null
            },
            pagination: data ?? getState().pagination
        });

        return this.bookService.favoriteBooks(data).pipe(
            map((books: BookDto[]) => dispatch(new FavoriteBooksSuccess(books))),
            catchError((error: HttpErrorResponse) => dispatch(new AddToFavoriteFailure(error)))
        );
    }

    @Action(FavoriteBooksSuccess)
    public favoriteBooksSuccess(
        { patchState }: StateContext<FavoriteBooks>,
        {data}: FavoriteBooksSuccess
    ): void {
        patchState({
            getFavoriteBooksStatus: {
                loading: false,
                success: true,
                error: null
            },
            favoriteBooks: data
        });
    }

    @Action(FavoriteBooksFailure)
    public favoriteBooksFailure(
        { patchState }: StateContext<FavoriteBooks>,
        { error }: SearchBookFailure
    ): void {
        patchState({
            getFavoriteBooksStatus: {
                loading: false,
                success: false,
                error
            },
        });
    }

    @Action(RemoveFromFavorite)
    public removeFavoriteBooks(
        { dispatch, patchState }: StateContext<FavoriteBooks>,
        {data}: RemoveFromFavorite
        ): Observable<void | Observable<void>>
    {
        patchState({
            removeFavoriteBookStatus: {
                loading: true,
                success: false,
                error: null
            },
        });

        return this.bookService.remove(data).pipe(
            map((books: BookDto[]) => dispatch(new FavoriteBooksSuccess(books))),
            catchError((error: HttpErrorResponse) => dispatch(new AddToFavoriteFailure(error)))
        );
    }

    @Action(RemoveFromFavoriteSuccess)
    public removeFavoriteBooksSuccess(
        { patchState }: StateContext<FavoriteBooks>,
        {data}: RemoveFromFavoriteSuccess
    ): void {
        patchState({
            removeFavoriteBookStatus: {
                loading: false,
                success: true,
                error: null
            },
            favoriteBooks: data
        });
    }

    @Action(RemoveFromFavoriteFailure)
    public removeFavoriteBooksFailure(
        { patchState }: StateContext<FavoriteBooks>,
        { error }: RemoveFromFavoriteFailure
    ): void {
        patchState({
            removeFavoriteBookStatus: {
                loading: false,
                success: false,
                error
            },
        });
    }

    @Action(UpdatePagination)
    public updatePagination(
        { patchState, dispatch, getState }: StateContext<IBookState>,
        { data }: UpdatePagination
    ): void {
        patchState({
            pagination: {
                query: '',
                startIndex: data.startIndex ?? getState().pagination.startIndex,
                maxResults: data.maxResults ?? getState().pagination.maxResults,
            }
        });
    }

    @Selector()
    public static favoriteBooks({favoriteBooks}: FavoriteBooks): BookDto[] {
        return favoriteBooks;
    }

    @Selector()
    public static totalItemFavoriteBooks({favoriteBooks}: FavoriteBooks): number {
        return favoriteBooks.length;
    }

    @Selector()
    public static pagination(): Pagination {
        return null;
    }

    public static isFavoriteBook(bookId: string) {
        return createSelector([FavoriteBookState], (state: FavoriteBooks) => {
            return state.favoriteBooks.some((book: BookDto) => book.bookId === bookId);
        })
    }
}
