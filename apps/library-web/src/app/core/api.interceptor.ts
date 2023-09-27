import {
  HttpContextToken,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {Observable} from 'rxjs';

type GetHeadersOptions = {
  shouldAddToken: boolean;
};

export const API_CONTEXT_TOKEN: HttpContextToken<string> =
  new HttpContextToken<string>(() => 'apiUrl');

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    @Inject('PRODUCTION') private production: boolean,
    @Inject('NX_API_URL') private apiUrl: string,
    @Inject('BOOK_URL') private bookUrl: string,
    public store: Store
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const context: string = request.context.get(API_CONTEXT_TOKEN);
    let clone: HttpRequest<unknown> = request;

    switch (context) {
      case 'apiUrl':
        clone = this.addDefaultRequest(request);
        break;
      case 'bookUrl':
        clone = this.addBookRequest(request);
        break;
    }

    return next.handle(clone);
  }

  private addDefaultRequest(
    request: HttpRequest<unknown>
  ): HttpRequest<unknown> {
    let clone: HttpRequest<unknown> = request;

    clone = request.clone({
      url: `${this.apiUrl}/${request.url}`,
      headers: this.getHeaders(request, { shouldAddToken: true }),
    });

    return clone;
  }

  private addBookRequest(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let clone: HttpRequest<unknown> = request;
    const key: string = 'AIzaSyBGyulc704srlyU5tSP4zHdSX9tUw379OM';
    const url: string = request.url.includes('?')
      ? `${this.bookUrl}${request.url}&&key=${key}`
      : `${this.bookUrl}${request.url}?key=${key}`;

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

    // if (options.shouldAddToken) {
    //   const token: string | null = this.store.selectSnapshot(AuthState.token);
    //
    //   if (!!token) {
    //     headers = headers.set('php-auth-digest', token);
    //   }
    // }

    return headers;
  }
}
