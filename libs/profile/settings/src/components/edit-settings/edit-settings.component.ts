import {Component, DestroyRef, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorFormComponent} from "../../../../../error-form/src/lib/error-form.component";
import {Store} from "@ngxs/store";
import {
  UpdateForm,
  UpdateUserData,
  UserData,
  UserDto,
  UserState,
} from '@monorepo/profile/data-access';
import {UpdateUserDto} from "../../../../data-access/src/dto/update-user.model.dto";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { distinctUntilChanged, filter, Observable, tap } from 'rxjs';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {isEqual} from "lodash";
import {HttpErrorResponse} from "@angular/common/http";
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'monorepo-edit-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    ErrorFormComponent,
    MatDatepickerModule,
    MatDividerModule
  ],
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss'],
})
export class EditSettingsComponent implements OnInit {

  public userLoading$: Observable<boolean> = this.store.select(UserState.userLoading);

  public error$: Observable<HttpErrorResponse> = this.store.select(UserState.error);

  public form: FormGroup<UpdateForm> = this.fb.group({
    name: this.fb.control(''),
    birthDate: this.fb.control(''),
    email: this.fb.control({value: '', disabled: true}, [Validators.email]),
    password: this.fb.control(''),
    confirmPassword: this.fb.control(''),
  });

  private user$: Observable<UserDto> = this.store.select(UserState.user);

  public constructor(
    private fb: FormBuilder,
    private store: Store,
    private destroyRef: DestroyRef){}

  public ngOnInit() {
    this.getUserData();
    this.handleUser();
  }

  private getUserData(): void {
    this.store.dispatch(new UserData());
  }

  private handleUser(): void {
    this.user$.pipe(
      filter(Boolean),
      distinctUntilChanged(isEqual),
      tap(({name, email, birthDate}: UserDto) => this.form.patchValue({
        name,
        email,
        birthDate
      })),
      takeUntilDestroyed(this.destroyRef)
      ).subscribe()

  }

  public submitForm(): void {
    const data: UpdateUserDto = this.form.getRawValue() as any as UpdateUserDto;

    this.store.dispatch(new UpdateUserData(data));
  }
}
