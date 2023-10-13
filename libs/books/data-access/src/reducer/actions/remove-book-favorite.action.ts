import {HttpErrorResponse} from '@angular/common/http';
import {BookDto} from '../../dto/book.dto';

export class RemoveFromFavorite {
    public static readonly type: string = '[Book] Remove To Favorite';

    constructor(public data: string) {}
}

export class RemoveFromFavoriteSuccess {
    public static readonly type: string = '[Book] Remove To Favorite Success';

    constructor(public data: BookDto[]) {}
}

export class RemoveFromFavoriteFailure {
    public static readonly type: string = '[Book] Remove To Favorite Failure';
    constructor(public error: HttpErrorResponse) {}
}