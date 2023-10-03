import {HttpErrorResponse} from '@angular/common/http';

export class SearchBook {
    public static readonly type: string = '[Book] Search';

    constructor(public data: string) {}
}

export class SearchBookSuccess {
    public static readonly type: string = '[Book] Search Success';

    constructor(public data: any) {}
}

export class SearchBookFailure {
    public static readonly type: string = '[Book] Search Failure';
    constructor(public error: HttpErrorResponse) {}
}