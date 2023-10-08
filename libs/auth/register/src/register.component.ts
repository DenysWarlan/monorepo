import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {Register, RegisterDto, RegisterForm} from '@monorepo/auth/data-access';
import {ErrorFormComponent} from '../../../error-form/src/lib/error-form.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {RegisterState} from '@monorepo/auth/data-access';
import {HttpErrorResponse} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from "@angular/material/card";

@Component({
  standalone: true,
  selector: 'mnp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    ErrorFormComponent,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatCardModule
  ]
})
export class RegisterComponent {

  private charsCount = 6;

  public form: FormGroup<RegisterForm> = this.fb.group({
    name: this.fb.control('',  [Validators.required]),
    birthDate: this.fb.control(''),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(this.charsCount),
    ]),
  });

  public errors$: Observable<HttpErrorResponse> = this.store.select(
    RegisterState.errors
  );

  public isRegisterLoading$: Observable<boolean> = this.store.select(
      RegisterState.isRegisterLoading
  );

  public constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  public submitForm(): void {
    const data: RegisterDto = this.form.value as RegisterDto;

    this.store.dispatch(new Register(data));
  }

  public login(): void  {
    this.router.navigate(['/login'], {
      relativeTo: this.route,
    });
  }
}
