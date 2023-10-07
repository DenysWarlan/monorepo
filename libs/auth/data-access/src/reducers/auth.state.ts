import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthLogin, LoginFailure, LoginSuccess, Logout,} from './actions/login.actions';
import {ClearToken, SetToken} from './actions/setToken.actions';
import {LoggedDto} from '../dto/logged.model.dto';
import {Refresh, RefreshFailure, RefreshSuccess} from './actions/refresh.actions';

export interface Auth {
  isAuth: boolean;
  isAuthLoading: boolean;
  error: HttpErrorResponse | null;
  accessToken: string | null;
  refreshToken: string | null;
  email: string;
}

@State<Auth>({
  name: 'auth',
  defaults: {
    isAuth: false,
    isAuthLoading: false,
    error: null,
    accessToken: null,
    refreshToken: null,
    email:''
  },
})
@Injectable()
export class AuthState {
  constructor(
    private authService: AuthService,
  ) {}

  @Action(Logout)
  public logout({ dispatch, patchState }: StateContext<Auth>): void {
    patchState({
      isAuth: false,
      isAuthLoading: false,
      error: null,
      accessToken: null,
      refreshToken: null,
      email: ''
    });

    dispatch(new ClearToken());
  }

  @Action(AuthLogin)
  public login({ dispatch, patchState }: StateContext<Auth>, { data }: AuthLogin): Observable<void | Observable<void>> {
    patchState({
      isAuth: false,
      isAuthLoading: true,
      error: null,
      accessToken: null,
      refreshToken: null,
      email: ''
    });

    return this.authService.login(data).pipe(
      map((data: LoggedDto) => dispatch(new LoginSuccess(data))),
      catchError((error: HttpErrorResponse) => dispatch(new LoginFailure(error)))
    );
  }

  @Action(LoginSuccess)
  public loginSuccess(
    { patchState, dispatch }: StateContext<Auth>,
    { data }: LoginSuccess
  ): void {
    patchState({
      isAuthLoading: false,
      isAuth: true
    });

    if (data) {
      dispatch(new SetToken(data));
    }


    dispatch(new UserData())
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

  @Action(Refresh)
  public refresh({ patchState, dispatch }: StateContext<Auth>): Observable<void | Observable<void>> {
    patchState({
      accessToken: null
    })

    return this.authService.refresh().pipe(
        map((data: {refreshedToken: string}) => {
          return dispatch(new RefreshSuccess(data.refreshedToken))
        }),
        catchError((error: HttpErrorResponse) => {
          return dispatch(new RefreshFailure(error))
        })
    )
  }

  @Action(RefreshSuccess)
  public refreshSuccess({ patchState, dispatch, getState }: StateContext<Auth>, { data }: RefreshSuccess): void {
    patchState({
      accessToken: data
    });

    const logged: LoggedDto = {
      accessToken: data,
      refreshToken: getState().refreshToken,
      email: getState().email
    }

    dispatch(new SetToken(logged))

  }

  @Action(RefreshFailure)
  public refreshFailure({ patchState }: StateContext<Auth>, { error }: RefreshFailure): void {
    patchState({
      accessToken: null,
      error
    })
  }

  @Action(SetToken)
  public setToken({ patchState }: StateContext<Auth>, { data }: SetToken): void  {
    patchState({
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      email: data.email
    });

    return this.authService.setToken(data);
  }

  @Action(ClearToken)
  public clearToken({ patchState }: StateContext<Auth>): void {
    patchState({
      accessToken: null,
    });

    return this.authService.clearToken();
  }

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
  public static logged({ accessToken, refreshToken}: Auth): LoggedDto {
    return {
      accessToken,
      refreshToken
    };
  }

  @Selector()
  public static accessToken({ accessToken}: Auth): string {
    return accessToken;
  }
}
