import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {AuthState} from '@monorepo/auth/data-access';
import {environment} from '../../environments/environment';

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

    clone = context  ? this.addDefaultRequest(request): this.addBookRequest(request)


    return next.handle(clone);
  }

  private addDefaultRequest(
    request: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    let clone: HttpRequest<unknown> = request;
    const url: string = environment.apiUrl;

    clone = request.clone({
      url: `${url}/${request.url}`,
      headers: request.headers,
    });

    return clone;
  }

  private addBookRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let clone: HttpRequest<unknown> = request;
    const envUrl: string = environment.bookUrl;
    const key: string = 'AIzaSyB6hiZBAGaa0Kj946BgGl_DFUwFiLWJhCE';
    const url: string = request.url.includes('?')
      ? `${request.url}&&key=${key}`
      : `${envUrl + request.url}?key=${key}`;

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
        headers = headers.set('php-auth-digest', token);
      }
    }

    return headers;
  }
}
