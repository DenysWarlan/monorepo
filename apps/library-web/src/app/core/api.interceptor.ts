import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {AuthState} from '@monorepo/auth/data-access';
import * as env from '../../environments/environment';
import * as envProd from '../../environments/environment.prod';

type GetHeadersOptions = {
  shouldAddToken: boolean;
};

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    @Inject('PRODUCTION') private production: boolean,
    public store: Store
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const context: boolean = request.url.startsWith('api');
    let clone: HttpRequest<unknown> = request;

    clone = context  ? this.addDefaultRequest(request) : this.addBookRequest(request);


    return next.handle(clone);
  }

  private addDefaultRequest(
    request: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    let clone: HttpRequest<unknown> = request;


    const envUrl: string = this.production ? envProd.environment.apiUrl : env.environment.apiUrl;

    clone = request.clone({
      url: `${envUrl}/${request.url}`,
      headers: request.headers,
    });

    return clone;
  }

  private addBookRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let clone: HttpRequest<unknown> = request;
    const key: string = 'AIzaSyB6hiZBAGaa0Kj946BgGl_DFUwFiLWJhCE';


    const envUrl: string = this.production ? envProd.environment.bookUrL : env.environment.bookUrL;
    const url: string = request.url.includes('?')
        ? `${envUrl}/${request.url}&&key=${key}`
        : `${envUrl}/${request.url}?key=${key}`;

    clone = request.clone({
      url,
      headers: this.getHeaders(request, { shouldAddToken: true }),
    });

    return clone;
  }

  private getHeaders(
    request: HttpRequest<unknown>,
    options: GetHeadersOptions
  ): HttpHeaders {
    let headers: HttpHeaders = request.headers;

    if (options.shouldAddToken) {
      const token: string | null = this.store.selectSnapshot(AuthState.logged).accessToken;

      if (!!token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    return headers;
  }
}
