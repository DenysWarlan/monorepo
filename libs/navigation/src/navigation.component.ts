import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {AuthState, Logout} from '@monorepo/auth/data-access';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {Route} from './route.enum';

@Component({
  selector: 'monorepo-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  public readonly Route: typeof Route = Route;

  public isAuth$: Observable<boolean> = this.store.select(AuthState.isAuthSuccess);

  public constructor(
     private router: Router,
     private store: Store
  ) {}

  public redirect(route: Route): void {
    this.router.navigate([`/${route}`]);
  }

  public logout(): void {
    this.store.dispatch(new Logout())
  }
}
