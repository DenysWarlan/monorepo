import {HttpErrorResponse} from '@angular/common/http';
import {Books} from '../../model/books.model';
import {Pagination} from '../../model/pagination.model';

export class SearchBook {
    public static readonly type: string = '[Book] Search';

    constructor(public data: Pagination) {}
}

export class UpdatePagination {
    public static readonly type: string = '[Book] Update pagination';

    constructor(public data: Pagination) {}
}

export class SearchBookSuccess {
    public static readonly type: string = '[Book] Search Success';

    constructor(public data: Books) {}
}

export class SearchBookFailure {
    public static readonly type: string = '[Book] Search Failure';
    constructor(public error: HttpErrorResponse) {}
}