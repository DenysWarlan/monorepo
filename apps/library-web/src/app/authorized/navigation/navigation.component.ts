import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {AuthState, Logout} from '@monorepo/auth/data-access';


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
    this.router.navigate(['auth/login']);
  }

  public logOut(): void {
    localStorage.clear();
    this.store.dispatch(new Logout());
    this.router.navigate(['auth/login']);
  }
}
