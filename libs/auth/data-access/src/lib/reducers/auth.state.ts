import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthLogin, LoginFailure, LoginSuccess, Logout,} from './actions/login.actions';
import {ClearToken, SetToken} from './actions/setToken.actions';
import {LoggedDto} from '../dto/logged.model.dto';

export interface Auth {
  isAuth: boolean;
  isAuthLoading: boolean;
  error: HttpErrorResponse | null;
  accessToken: string | null;
  id: string | null;
}

@State<Auth>({
  name: 'auth',
  defaults: {
    isAuth: false,
    isAuthLoading: false,
    error: null,
    accessToken: null,
    id: null,
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
    });

    dispatch(new ClearToken());
  }

  @Action(AuthLogin)
  public login({ dispatch, patchState }: StateContext<Auth>, { data }: AuthLogin): Observable<void | Observable<void>> {
    patchState({
      isAuth: false,
      isAuthLoading: true,
      error: null,
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

  @Action(SetToken)
  public setToken({ patchState }: StateContext<Auth>, { data }: SetToken): void  {
    patchState({
      accessToken: data.accessToken,
      id: data.id,
    });

    return this.authService.setToken(data);
  }

  @Action(ClearToken)
  public clearToken({ patchState }: StateContext<Auth>): void {
    patchState({
      accessToken: null,
      id: null,
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
  public static logged({ accessToken, id }: Auth): LoggedDto {
    return {
      accessToken,
      id
    };
  }
}
