import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {catchError, filter, Observable, switchMap, throwError} from 'rxjs';
import {AuthState, Refresh} from '@monorepo/auth/data-access';
import * as env from '../../environments/environment';
import * as envProd from '../../environments/environment.prod';
import {HttpStatus} from './enums/http-status.enum';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

    private isRefreshing: boolean = false;

  public constructor(
    @Inject('PRODUCTION') private production: boolean,
    public store: Store
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const context: boolean = request.url.startsWith('api');
    let clone: HttpRequest<unknown> = request;


    clone = context  ? this.addDefaultRequest(request) : this.addBookRequest(request);


    return next.handle(clone)
        .pipe(
            catchError(error => {
              if (error instanceof HttpErrorResponse && !request.url.includes('auth/login') && error.status === HttpStatus.UNAUTHORIZED) {
                return this.handle401Error(clone, next);
              }

              return throwError(error);
            }),
        );
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     const oldToken: string = JSON.parse(localStorage.getItem('accessToken'));

      if(!this.isRefreshing) {
         this.isRefreshing = true;
         const accessToken$: Observable<string> = this.store.select(AuthState.accessToken);
         this.store.dispatch(new Refresh());


         return accessToken$.pipe(
             filter(Boolean),
             switchMap((accessToken: string) => {
                 this.isRefreshing = false;

                 return next.handle(this.addTokenHeader(request, accessToken));
             })
         )
     }

      return next.handle(this.addTokenHeader(request, oldToken));
  }

  private addDefaultRequest(
    request: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    let clone: HttpRequest<unknown> = request;

    const token: string | null = JSON.parse(localStorage.getItem('accessToken'));

    const envUrl: string = this.production ? envProd.environment.apiUrl : env.environment.apiUrl;

    clone = request.clone({
      url: `${envUrl}/${request.url}`,
    });

    return this.addTokenHeader(clone, token);
  }

  private addBookRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let clone: HttpRequest<unknown> = request;

    const key: string = 'AIzaSyB6hiZBAGaa0Kj946BgGl_DFUwFiLWJhCE';

    const envUrl: string = this.production ? envProd.environment.bookUrL : env.environment.bookUrL;

    const url: string = request.url.includes('?')
        ? `${envUrl}/${request.url}&&key=${key}`
        : `${envUrl}/${request.url}?key=${key}`;

    clone = request.clone({url});

    return clone;
  }

    private addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<unknown> {
        return request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) });
    }
}
