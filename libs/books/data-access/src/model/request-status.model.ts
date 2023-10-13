import {HttpErrorResponse} from '@angular/common/http';

export interface RequestStatus {
    readonly loading: boolean,
    readonly success: boolean,
    readonly error: HttpErrorResponse;
}