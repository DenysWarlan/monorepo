import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  AuthLogin,
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
  isRegister: boolean;
  error: HttpErrorResponse | null;
  accessToken: string | null;
}

@State<Auth>({
  name: 'auth',
  defaults: {
    isAuth: false,
    isAuthLoading: false,
    isRegister: false,
    error: null,
    accessToken: null,
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
      accessToken: null,
    });

    dispatch(new ClearToken({ data: { token: '', userId: '' } }));
  }

  @Action(AuthLogin)
  public login({ dispatch, patchState }: StateContext<Auth>, { data }: AuthLogin): Observable<void | Observable<void>> {
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

    if (data) {
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
      isRegister: true,
    });

    return this.authService.register(data).pipe(
      map((invitations) => dispatch(new RegisterSuccess(invitations))),
      catchError((error) => dispatch(new RegisterFailure(error)))
    );
  }

  @Action(RegisterSuccess)
  public registerSuccess({ patchState }: StateContext<Auth>): void {
    patchState({
      isRegister: true,
      isAuth: false,
    });
  }

  @Action(RegisterFailure)
  public registerFailure(
    { patchState }: StateContext<Auth>,
    { error }: LoginFailure
  ): void {
    patchState({
      isRegister: false,
      isAuth: false,
      error,
    });
  }

  @Action(SetToken)
  public setToken({ patchState }: StateContext<Auth>, { data }: SetToken): void  {
    patchState({
      accessToken: data.accessToken,
    });

    return this.authService.setToken(data);
  }

  @Action(ClearToken)
  public clearToken({ patchState }: StateContext<Auth>, { data }: SetToken): void {
    patchState({
      accessToken: data,
    });

    return this.authService.setToken(data);
  }

  @Selector()
  public static isAuthSuccess({ isAuth }: Auth): boolean {
    return isAuth;
  }
  @Selector()
  public static isRegister({ isRegister }: Auth): boolean {
    return isRegister;
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
  public static token({ accessToken }: Auth): string | null {
    return accessToken;
  }
}
