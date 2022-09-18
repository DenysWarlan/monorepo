import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {AuthState} from "../reducers/auth/auth.state";

type GetHeadersOptions = {
  shouldAddToken: boolean;
};

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    @Inject('PRODUCTION') private production: boolean,
    @Inject('API_URL') private apiUrl: string,
    public store: Store
  ) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const clone: HttpRequest<unknown> = this.addDefaultRequest(request);

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

  private getHeaders(
    request: HttpRequest<unknown>,
    options: GetHeadersOptions
  ): HttpHeaders {
    let headers: HttpHeaders = request.headers;

    if (options.shouldAddToken) {
      const token: string | null = this.store.selectSnapshot(AuthState.token);

      if (token) {
        headers = headers.set('php-auth-digest', token);
      }
    }

    return headers;
  }
}
