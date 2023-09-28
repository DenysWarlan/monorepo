import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AuthState, ClearToken} from '@monorepo/auth/data-access';

@Injectable()
export class AuthGuard  {

  public constructor(private store: Store, private router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const token = localStorage.getItem('accessToken');

    const tokenParse = token.length ? JSON.parse(token) : false;

    const helper: JwtHelperService = new JwtHelperService();

    const isExpired: boolean | Promise<boolean> = helper.isTokenExpired(tokenParse);

    const isAuth = this.store.selectSnapshot(AuthState.isAuthSuccess);

    if (isExpired) {
      localStorage.clear();
      this.store.dispatch(new ClearToken());
    }

    return !isAuth ? this.router.navigate(['login']) : true;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate(route, state);
  }

}
