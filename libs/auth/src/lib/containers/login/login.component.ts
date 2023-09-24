import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {filter, Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {AuthState} from '../../reducers/auth.state';
import {AuthLogin} from '../../reducers/actions/login.actions';
import {SetToken} from '../../reducers/actions/setToken.actions';
import {Destroy} from '../../../../../destroy/src/lib/destroy';
import {LoginForm} from '../../models/login-form.model';
import {Login} from '../../models/login.model';

@Component({
  selector: 'monorepo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends Destroy implements OnInit {

  private charsCount: number = 6;

  public isAuthSuccess$: Observable<boolean> = this.store.select(AuthState.isAuthSuccess);

  public isAuthLoading$: Observable<boolean> = this.store.select(AuthState.isAuthSuccess);

  public authErrors: Observable<HttpErrorResponse | null> = this.store.select(AuthState.authErrors);

  public form: FormGroup<LoginForm> = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(this.charsCount),
    ]),
  });
  constructor(
    private router: Router,
    private store: Store,
    private fb: FormBuilder
  ) {
    super();
  }
  public ngOnInit(): void {
    this.handleIsAuthSuccess();
  }

  public loginUser(): void {
    const data: Login = this.form.value as Login;

    this.store.dispatch(new AuthLogin(data));
  }

  private handleIsAuthSuccess(): void {
    this.isAuthSuccess$
      .pipe(filter(Boolean), takeUntil(this.subGuard$))
      .subscribe(() => {
        this.store.dispatch(
          new SetToken({ data: localStorage.getItem('token') })
        );
        this.router.navigate(['home']);
      });
  }
}
