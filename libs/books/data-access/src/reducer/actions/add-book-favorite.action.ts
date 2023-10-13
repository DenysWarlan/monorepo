import {HttpErrorResponse} from '@angular/common/http';
import {BookDto} from '../../dto/book.dto';

export class AddToFavorite {
    public static readonly type: string = '[Book] Add To Favorite';

    constructor(public data: BookDto) {}
}

export class AddToFavoriteSuccess {
    public static readonly type: string = '[Book] Add To Favorite Success';

    constructor(public data: BookDto[]) {}
}

export class AddToFavoriteFailure {
    public static readonly type: string = '[Book] Add To Favorite Failure';
    constructor(public error: HttpErrorResponse) {}
}