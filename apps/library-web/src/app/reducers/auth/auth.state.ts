import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Login,
  LoginFailure,
  LoginSuccess,
  Logout,
} from './actions/login.actions';
import {
  Register,
  RegisterFailure,
  RegisterSuccess,
} from './actions/register.actions';
import { ClearToken, SetToken } from './actions/setToken.actions';

export interface Auth {
  isAuth: boolean;
  isAuthLoading: boolean;
  error: HttpErrorResponse | null;
  token: string | null;
}

@State<Auth>({
  name: 'auth',
  defaults: {
    isAuth: false,
    isAuthLoading: false,
    error: null,
    token: null,
  },
})
@Injectable()
export class AuthState {
  constructor(private authService: AuthService, private store: Store) {}

  @Action(Logout)
  public logout({ dispatch, patchState }: StateContext<Auth>): void {
    patchState({
      isAuth: false,
      isAuthLoading: false,
      error: null,
      token: null,
    });

    dispatch(new ClearToken({ data: { token: '', userId: '' } }));
  }

  @Action(Login)
  public login({ dispatch, patchState }: StateContext<Auth>, { data }: Login) {
    patchState({
      isAuthLoading: true,
    });

    return this.authService.login(data).pipe(
      map((data) => dispatch(new LoginSuccess(data))),
      catchError((error) => dispatch(new LoginFailure(error)))
    );
  }

  @Action(LoginSuccess)
  public loginSuccess(
    { patchState, dispatch }: StateContext<Auth>,
    { data }: LoginSuccess
  ): void {
    patchState({
      isAuthLoading: false,
      isAuth: true,
    });
    console.log(data);

    if (!!data) {
      dispatch(new SetToken(data));
    }
  }
  @Action(LoginFailure)
  public loginFailure(
    { patchState }: StateContext<Auth>,
    { error }: LoginFailure
  ): void {
    patchState({
      isAuthLoading: false,
      isAuth: false,
      error,
    });
  }

  @Action(Register)
  public register(
    { dispatch, patchState }: StateContext<Auth>,
    { data }: Register
  ): Observable<void | Observable<void>> {
    patchState({
      isAuthLoading: true,
    });

    return this.authService.register(data).pipe(
      map((invitations) => dispatch(new RegisterSuccess(invitations))),
      catchError((error) => dispatch(new RegisterFailure(error)))
    );
  }
  @Action(RegisterSuccess)
  public registerSuccess({ patchState }: StateContext<Auth>): void {
    patchState({
      isAuthLoading: false,
      isAuth: true,
    });
  }
  @Action(RegisterFailure)
  public registerFailure(
    { patchState }: StateContext<Auth>,
    { error }: LoginFailure
  ): void {
    patchState({
      isAuthLoading: false,
      isAuth: false,
      error,
    });
  }

  @Action(SetToken)
  public setToken({ patchState }: StateContext<Auth>, { data }: SetToken) {
    console.log(data);
    patchState({
      token: data.token,
    });
    return this.authService.setToken(data);
  }

  @Action(ClearToken)
  public clearToken({ patchState }: StateContext<Auth>, { data }: SetToken) {
    console.log(data);
    patchState({
      token: data.token,
    });
    return this.authService.setToken(data);
  }

  // disable @typescript-eslint/member-ordering
  @Selector()
  public static isAuthSuccess({ isAuth }: Auth): boolean {
    return isAuth;
  }

  @Selector()
  public static isAuthLoading({ isAuthLoading }: Auth): boolean {
    return isAuthLoading;
  }

  @Selector()
  public static authErrors({ error }: Auth): HttpErrorResponse | null {
    return error;
  }

  @Selector()
  public static token({ token }: Auth): string | null {
    return token;
  }
}
