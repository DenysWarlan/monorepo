import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Login } from '../../reducers/auth/actions/login.actions';
import { takeUntil } from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '../../reducers/auth/auth.state';
import { HttpErrorResponse } from '@angular/common/http';
import { SetToken } from '../../reducers/auth/actions/setToken.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  @Select(AuthState.isAuthSuccess) public isAuthSuccess$!: Observable<boolean>;
  @Select(AuthState.isAuthLoading) public isAuthLoading$!: Observable<boolean>;
  @Select(AuthState.authErrors) public authErrors!: Observable<HttpErrorResponse>;

  charsCount = 6;
  form!: FormGroup;
  private destroyed$: Subject<boolean> = new Subject();
  constructor(private router: Router, private route: ActivatedRoute, private store: Store) {}
  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(this.charsCount)]),
    });
  }
  ngOnDestroy() {
    this.destroyed$.next(false);
  }

  loginUser() {
    const params: any = this.form.value;
    this.store.dispatch(new Login({ data: params }));
    this.isAuthSuccess$.pipe(takeUntil(this.destroyed$)).subscribe(x => {
      if (x) {
        this.store.dispatch(new SetToken({ data: localStorage.getItem('token') }));
        this.router.navigate(['home']);
      }
    });
  }
}
