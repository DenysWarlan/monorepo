import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Store} from '@ngxs/store';
import {AuthState} from '@monorepo/auth/data-access';

@Injectable()
export class AuthGuard  {

  public constructor(private store: Store, private router: Router) {}

  public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const isAuth: boolean = this.store.selectSnapshot(AuthState.isAuthSuccess);

    return !isAuth ? this.router.navigate(['login']) : true;
  }

  canActivateChild(): Observable<boolean> | Promise<boolean> | boolean {
    return this.canActivate();
  }

}
