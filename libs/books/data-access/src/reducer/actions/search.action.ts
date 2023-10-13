import {HttpErrorResponse} from '@angular/common/http';
import {Pagination} from '../../model/pagination.model';
import {BookListDto} from '../../dto/book-list.dto';

export class SearchBook {
    public static readonly type: string = '[Book] Search';

    constructor(public data: Pagination) {}
}

export class SearchBookSuccess {
    public static readonly type: string = '[Book] Search Success';

    constructor(public data: BookListDto) {}
}

export class SearchBookFailure {
    public static readonly type: string = '[Book] Search Failure';
    constructor(public error: HttpErrorResponse) {}
}

export class UpdatePagination {
    public static readonly type: string = '[Book] Update pagination';

    constructor(public data: Pagination) {}
}

export class ResetBooks {
    public static readonly type: string = '[Book] Reset Search';
}