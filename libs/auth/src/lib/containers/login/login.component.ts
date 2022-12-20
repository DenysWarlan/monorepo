import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { filter, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthState } from '../../reducers/auth.state';
import { Login } from '../../reducers/actions/login.actions';
import { SetToken } from '../../reducers/actions/setToken.actions';
import { Destroy } from '../../../../../destroy/src/lib/destroy';

@Component({
  selector: 'monorepo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends Destroy implements OnInit {
  public isAuthSuccess$: Observable<boolean> = this.store.select(
    AuthState.isAuthSuccess
  );
  public isAuthLoading$: Observable<boolean> = this.store.select(
    AuthState.isAuthSuccess
  );
  public authErrors: Observable<HttpErrorResponse | null> = this.store.select(
    AuthState.authErrors
  );
  public form!: FormGroup;
  private charsCount: number = 6;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    super();
  }
  public ngOnInit(): void {
    this.form = this.createForm();

    this.handleIsAuthSuccess();
  }

  public loginUser(): void {
    const params: any = this.form.value;
    this.store.dispatch(new Login({ data: params }));
  }

  private createForm(): FormGroup {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(this.charsCount),
      ]),
    });
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
