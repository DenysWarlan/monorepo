import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// @ts-ignore
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const token = localStorage.getItem('token');
    const tokenParse = token ? JSON.parse(token) : false;
    if (tokenParse) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${tokenParse}`
        }
      });
    }

    return next.handle(request);
  }
}
