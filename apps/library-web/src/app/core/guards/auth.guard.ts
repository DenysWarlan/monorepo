import {Router} from '@angular/router';
import { filter, Observable, take } from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {AuthState} from '@monorepo/auth/data-access';

@Injectable()
export class AuthGuard  {

  public constructor(private store: Store, private router: Router) {}

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth$: Observable<boolean> = this.store.select(AuthState.isAuthSuccess);
    let isAuthorized: boolean;

    isAuth$
    .pipe(
      take(1)
      )
    .subscribe((isAuth: boolean) => {
      isAuthorized = isAuth;

      !isAuth ? this.router.navigate(['/login']) : null
    });

    return isAuthorized;
  }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }

}
