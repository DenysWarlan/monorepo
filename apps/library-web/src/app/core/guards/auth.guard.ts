import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, take, tap} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthState, ClearToken, Logout} from '@monorepo/auth/data-access';

@Injectable()
export class AuthGuard  {

  public constructor(private store: Store, private router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const token = localStorage.getItem('accessToken');

    const tokenParse = token ? JSON.parse(token) : false;

    const helper = new JwtHelperService();

    const isExpired = helper.isTokenExpired(tokenParse);

    const isAuth = this.store.selectSnapshot(AuthState.isAuthSuccess);

    if (isExpired) {
      localStorage.clear();
      this.store.dispatch(new ClearToken({ data: { token: '', userId: '' } }));
    }

    return !tokenParse || isExpired || !isAuth ? this.router.navigate(['auth/login']) : true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

}
