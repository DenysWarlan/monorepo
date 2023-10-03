import {Action, Selector, State, StateContext} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {BookService} from '../services/book.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SearchBook, SearchBookFailure, SearchBookSuccess} from '../actions/search.action';

export interface Book {
    search: string;
    searchLoading: boolean;
    books: any[];
    searchError: HttpErrorResponse;
}

@State<Book>({
    name: 'book',
    defaults: {
        search: '',
        searchLoading: false,
        searchError: null,
        books: []
    },
})
@Injectable()
export class BookState {
    constructor(
        private bookService: BookService,
    ) {}



    @Action(SearchBook)
    public login({ dispatch, patchState }: StateContext<Book>, { data }: SearchBook): Observable<void | Observable<void>> {
        patchState({
            searchLoading: true,
            searchError: null,
        });

        console.log(data);

        return this.bookService.getBooks(data).pipe(
            map((data: any[]) => dispatch(new SearchBookSuccess(data))),
            catchError((error: HttpErrorResponse) => dispatch(new SearchBookFailure(error)))
        );
    }

    @Action(SearchBookSuccess)
    public loginSuccess(
        { patchState, dispatch }: StateContext<Book>,
        { data }: SearchBookSuccess
    ): void {
        patchState({
            searchLoading: false,
            books: data,
        });
    }

    @Action(SearchBookFailure)
    public loginFailure(
        { patchState }: StateContext<Book>,
        { error }: SearchBookFailure
    ): void {
        patchState({
            searchLoading: false,
            searchError: error
        });
    }

    @Selector()
    public static books({ books }: Book): any[] {
        return books;
    }
}
