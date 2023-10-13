import {HttpErrorResponse} from '@angular/common/http';
import {BookDetailsDto} from '../../dto/book-details.dto';

export class BookDetails {
    public static readonly type: string = '[Book] Details';

    constructor(public data: string) {}
}

export class BookDetailsSuccess {
    public static readonly type: string = '[Book] Details Success';

    constructor(public data: BookDetailsDto) {}
}

export class BookDetailsFailure {
    public static readonly type: string = '[Book] Details Failure';
    constructor(public error: HttpErrorResponse) {}
}