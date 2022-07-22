import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ClearToken } from '../../reducers/auth/actions/setToken.actions';
import {Logout} from "../../reducers/auth/actions/login.actions";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {}
  logOut() {
    localStorage.clear();
    this.store.dispatch(new Logout());
    this.router.navigate(['login']);
  }
}
