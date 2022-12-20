import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ClearToken } from '../../../../../../libs/auth/src/lib/reducers/actions/setToken.actions';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('access_token');
    console.log(token);
    const tokenParse = token ? JSON.parse(token) : false;
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(tokenParse);
    if (isExpired) {
      localStorage.clear();
      this.store.dispatch(new ClearToken({ data: { token: '', userId: '' } }));
    }
    return !tokenParse || isExpired ? this.router.navigate(['login']) : true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }
}
