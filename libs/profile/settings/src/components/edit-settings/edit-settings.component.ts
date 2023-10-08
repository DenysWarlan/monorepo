import {Component, DestroyRef, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorFormComponent} from "../../../../../error-form/src/lib/error-form.component";
import {Store} from "@ngxs/store";
import {
    FormService,
  UpdateForm,
  UpdateUserData,
  UpdateValue,
  UserData,
  UserDto,
  UserState,
} from '@monorepo/profile/data-access';
import {UpdateUserDto} from "../../../../data-access/src/dto/update-user.model.dto";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { distinctUntilChanged, filter, Observable, take, tap } from 'rxjs';
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

  private charsCount = 6;

  public userLoading$: Observable<boolean> = this.store.select(UserState.userLoading);

  public userSuccess$: Observable<boolean> = this.store.select(UserState.userSuccess);

  public error$: Observable<HttpErrorResponse> = this.store.select(UserState.error);

  public form: FormGroup<UpdateForm> = this.fb.group({
    name: this.fb.control(''),
    birthDate: this.fb.control(''),
    email: this.fb.control({value: '', disabled: true}, [Validators.email]),
    password: this.fb.control('', Validators.minLength(this.charsCount)),
    confirmPassword: this.fb.control('', Validators.minLength(this.charsCount)),
  });

  public error: string;

  private user$: Observable<UserDto> = this.store.select(UserState.user);

  public constructor(
    private fb: FormBuilder,
    private store: Store,
    private formService: FormService,
    private destroyRef: DestroyRef
    ){}

  public ngOnInit() {
    this.getUserData();
    this.handleUser();
    this.handleForm();
  }

  private getUserData(): void {
    this.store.dispatch(new UserData());
  }

  private handleForm(): void {
    this.form.valueChanges
    .pipe(
      distinctUntilChanged(isEqual),
      tap((value: Partial<UpdateValue>) => {
        const passwordCtrl: FormControl<string> = this.form.controls.password;

        const confirmPasswordCtrl: FormControl<string> = this.form.controls.confirmPassword;

        this.toggleRequiredValidator(passwordCtrl, !!value.confirmPassword);

        this.toggleRequiredValidator(confirmPasswordCtrl, !!value.password);
      }),
      takeUntilDestroyed(this.destroyRef)
    )
    .subscribe()
  }

  private handleUser(): void {
    this.user$.pipe(
      filter(Boolean),
      distinctUntilChanged(isEqual),
      tap(({name, email, birthDate}: UserDto) => {
        this.form.patchValue({
          name,
          email,
          birthDate
        });
      }),
      takeUntilDestroyed(this.destroyRef)
      ).subscribe()

  }

  public submitForm(): void {
    const {email, birthDate, name}: UpdateValue = this.form.getRawValue();

    const data: UpdateUserDto = {
      email,
      birthDate,
      name
    }

    if(data.password !== data.confirmPassword) {
      this.error = 'Password not equal';
      return;
    }

    this.error = null;

    this.store.dispatch(new UpdateUserData(data));
  }

  public updatePassword(): void {
    const {email, password, confirmPassword}: UpdateValue = this.form.getRawValue();

    const data: UpdateUserDto = {
      email,
      password,
      confirmPassword
    }
    if(data.password !== data.confirmPassword) {
      this.error = 'Password not equal';
      return;
    }

    this.error = null;

    this.store.dispatch(new UpdateUserData(data));

    this.userSuccess$
    .pipe(
      filter(Boolean),
      tap(() => {
        this.form.controls.password.reset('');

        this.form.controls.confirmPassword.reset('');
      }),
      take(1),
      )
    .subscribe()
  }

  private toggleRequiredValidator(ctrl: FormControl, isRequired: boolean): void {
    isRequired ? this.formService.setValidator(ctrl, Validators.required): this.formService.resetValibator(ctrl, Validators.required)
  }
}
