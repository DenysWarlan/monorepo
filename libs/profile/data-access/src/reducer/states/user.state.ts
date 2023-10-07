import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {UserDto} from "../../dto/user.model.dto";
import {UserService} from "../services/user.service";
import {UserData, UserDataFailure, UserDataSuccess} from "../actions/user.actions";

export interface User {
  readonly userLoading: boolean;
  readonly userSuccess: boolean;
  readonly user: UserDto;
  readonly error: HttpErrorResponse;
}

@State<User>({
  name: 'user',
  defaults: {
    user: null,
    userLoading: false,
    userSuccess: false,
    error: null
  },
})
@Injectable()
export class UserState {
  constructor(
    private userService: UserService,
  ) {}

  @Action(UserData)
  public user({ dispatch, patchState }: StateContext<User>): Observable<void | Observable<void>> {
    patchState({
      user: null,
      userLoading: true,
      userSuccess: false,
    });

    return this.userService.user().pipe(
      map((data: UserDto) => dispatch(new UserDataSuccess(data))),
      catchError((error: HttpErrorResponse) => dispatch(new UserDataFailure(error)))
    );
  }

  @Action(UserDataSuccess)
  public userSuccess(
    { patchState }: StateContext<User>,
    { data }: UserDataSuccess
  ): void {
    patchState({
      userLoading: false,
      userSuccess: true,
      user: data
    });
  }

  @Action(UserDataFailure)
  public loginFailure(
    { patchState }: StateContext<User>,
    { error }: UserDataFailure
  ): void {
    patchState({
      userLoading: false,
      userSuccess: false,
      error
    });
  }

  @Selector()
  public static user({ user }: User): UserDto {
    return user;
  }
}
