import {HttpErrorResponse} from '@angular/common/http';
import {BookDto, Pagination} from '@monorepo/books/data-access';

export class GetFavoriteBooks {
    public static readonly type: string = '[Book] Get List To Favorite Books';

    constructor(public data?: Pagination) {
    }
}

export class FavoriteBooksSuccess {
    public static readonly type: string = '[Book] Get List To Favorite Books Success';

    public constructor(public data: BookDto[]) {}
}

export class FavoriteBooksFailure {
    public static readonly type: string = '[Book] Get List To Favorite Books Failure';
    constructor(public error: HttpErrorResponse) {}
}

export class UpdatePagination {
    public static readonly type: string = '[Book] Update pagination favorite books';

    constructor(public data: Pagination) {}
}