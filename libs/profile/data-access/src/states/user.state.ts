import {Action, Selector, State, StateContext} from '@ngxs/store';
import {catchError, map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {UpdateUserData, UpdateUserDataFailure, UpdateUserDataSuccess} from "../actions/update-user.actions";
import {UserData, UserDataFailure, UserDataSuccess} from "../actions/user.actions";
import {UserDto} from "../dto/user.model.dto";
import {UserService} from "../services/user.service";
import {DeleteUserData, DeleteUserDataFailure, DeleteUserDataSuccess} from '../actions/delete-user.actions';
import {Logout} from '@monorepo/auth/data-access';

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
    error: null,
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
  public userFailure(
    { patchState }: StateContext<User>,
    { error }: UserDataFailure
  ): void {
    patchState({
      userLoading: false,
      userSuccess: false,
      error
    });
  }

  @Action(UpdateUserData)
  public updateUser(
    { dispatch, patchState }: StateContext<User>,
    {data}: UpdateUserData
    ): Observable<void | Observable<void>> {
    patchState({
      user: null,
      userLoading: true,
      userSuccess: false,
    });

    return this.userService.updateUser(data).pipe(
      map((data: UserDto) => dispatch(new UpdateUserDataSuccess(data))),
      catchError((error: HttpErrorResponse) => dispatch(new UpdateUserDataFailure(error)))
      );
  }

  @Action(UpdateUserDataSuccess)
  public updateUserSuccess(
    { patchState }: StateContext<User>,
    { data }: UserDataSuccess
    ): void {
    patchState({
      userLoading: false,
      userSuccess: true,
      user: data
    });
  }

  @Action(UpdateUserDataFailure)
  public updateUserFailure(
    { patchState }: StateContext<User>,
    { error }: UserDataFailure
    ): void {
    patchState({
      userLoading: false,
      userSuccess: false,
      error
    });
  }


  @Action(DeleteUserData)
  public deleteUser(
    { dispatch, patchState }: StateContext<User>,
    ): Observable<void | Observable<void>> {
    patchState({
      user: null,
      userLoading: true,
      userSuccess: false,
    });

    return this.userService.deleteUser().pipe(
      map(() => dispatch(new Logout())),
      catchError((error: HttpErrorResponse) => dispatch(new DeleteUserDataFailure(error)))
      );
  }

  @Action(DeleteUserDataSuccess)
  public deleteUserSuccess(
    { patchState }: StateContext<User>,
    ): void {
    patchState({
      userLoading: false,
      userSuccess: true,
    });
  }

  @Action(DeleteUserDataFailure)
  public deleteUserFailure(
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
  
  @Selector()
  public static userLoading({ userLoading }: User): boolean {
    return userLoading;
  }

  @Selector()
  public static userSuccess({ userSuccess }: User): boolean {
    return userSuccess;
  }
  
  @Selector()
  public static error({ error }: User): HttpErrorResponse {
    return error;
  }
}
