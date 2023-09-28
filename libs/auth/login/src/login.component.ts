import {Component, DestroyRef, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {distinctUntilChanged, filter, Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router, RouterModule} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {Store} from '@ngxs/store';
import {AuthLogin, AuthState, Credentials, LoginForm} from '@monorepo/auth/data-access';
import {isEqual} from 'lodash';
import {ErrorFormComponent} from '../../../error-form/src/lib/error-form.component';


@Component({
  standalone: true,
  selector: 'mnp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    RouterModule,
    ErrorFormComponent
  ]
})
export class LoginComponent implements OnInit {

  private charsCount = 6;

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

  public constructor(
    private router: Router,
    private store: Store,
    private fb: FormBuilder,
    private destroyRef: DestroyRef
  ) {}

  public ngOnInit(): void {
    this.handleIsAuthSuccess();
  }

  public loginUser(): void {

    if(this.form.invalid) {
        return;
    }

    const data: Credentials = this.form.value as Credentials;

    this.store.dispatch(new AuthLogin(data));
  }

  private handleIsAuthSuccess(): void {
    this.isAuthSuccess$
      .pipe(
          filter(Boolean),
          distinctUntilChanged(isEqual),
          takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
          this.router.navigate(['home']);
      });
  }

}
