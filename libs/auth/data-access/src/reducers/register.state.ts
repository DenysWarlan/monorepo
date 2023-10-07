import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from './services/auth.service';
import {HttpErrorResponse} from '@angular/common/http';
import {LoginFailure,} from './actions/login.actions';
import * as registerActions from './actions/register.actions';
import {Router} from '@angular/router';

export interface Register {
  isRegisterSuccess: boolean;
  isRegisterLoading: boolean;
  error: HttpErrorResponse | null;
}

@State<Register>({
  name: 'register',
  defaults: {
    isRegisterSuccess: false,
    isRegisterLoading: false,
    error: null,
  },
})
@Injectable()
export class RegisterState {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  @Action(registerActions.Register)
  public register(
    { dispatch, patchState }: StateContext<Register>,
    { data }: registerActions.Register
  ): Observable<void | Observable<void>> {
    patchState({
      isRegisterLoading: true,
      isRegisterSuccess: false,
      error: null,
    });

    return this.authService.register(data).pipe(
      map(() => dispatch(new registerActions.RegisterSuccess())),
      catchError((error) => dispatch(new registerActions.RegisterFailure(error)))
    );
  }

  @Action(registerActions.RegisterSuccess)
  public registerSuccess({ patchState }: StateContext<Register>): void {
    patchState({
      isRegisterSuccess: true,
      isRegisterLoading: false,
    });

    this.router.navigate(['/login'])
  }

  @Action(registerActions.RegisterFailure)
  public registerFailure(
    { patchState }: StateContext<Register>,
    { error }: LoginFailure
  ): void {
    patchState({
      isRegisterSuccess: false,
      isRegisterLoading: false,
      error,
    });
  }

  @Selector()
  public static isRegisterSuccess({ isRegisterSuccess }: Register): boolean {
    return isRegisterSuccess;
  }

  @Selector()
  public static isRegisterLoading({ isRegisterLoading }: Register): boolean {
    return isRegisterLoading;
  }

  @Selector()
  public static errors({ error }: Register): HttpErrorResponse | null {
    return error;
  }

}
