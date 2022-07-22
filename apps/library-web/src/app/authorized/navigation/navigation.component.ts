import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Logout } from '../../reducers/auth/actions/login.actions';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {
  constructor(private router: Router, private store: Store) {}

  logOut() {
    localStorage.clear();
    this.store.dispatch(new Logout());
    this.router.navigate(['login']);
  }
}
