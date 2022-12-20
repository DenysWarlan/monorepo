import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Logout } from '../../../../../../libs/auth/src/lib/reducers/actions/login.actions';
import { Observable } from 'rxjs';
import { AuthState } from '../../../../../../libs/auth/src/lib/reducers/auth.state';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  public isAuth$: Observable<boolean> = this.store.select(
    AuthState.isAuthSuccess
  );
  constructor(private router: Router, private store: Store) {}

  public login(): void {
    this.router.navigate(['/auth/login']);
  }

  logOut() {
    localStorage.clear();
    this.store.dispatch(new Logout());
    this.router.navigate(['login']);
  }
}
