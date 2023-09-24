import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngxs/store';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, Observable, tap} from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CommonModule} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {AuthState, Login, LoginForm, Register} from '../../data-access/src/index';

@Component({
  standalone: true,
  selector: 'mnp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [
      CommonModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule
  ]
})
export class RegisterComponent implements OnInit {

  private charsCount = 6;

  public form: FormGroup<LoginForm> = this.fb.group({
  email: this.fb.control('', [Validators.required, Validators.email]),
  password: this.fb.control('', [
    Validators.required,
    Validators.minLength(this.charsCount),
  ]),
});

  private isRegister: Observable<boolean> = this.store.select(
    AuthState.isRegister
  );

  public constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.handleRegister();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(this.charsCount),
      ]),
    });
  }

  public submitForm(): void {
    const data: Login = this.form.value as Login;
    this.store.dispatch(new Register(data));
  }

  public login(): void  {
    this.router.navigate(['/auth/login'], {
      relativeTo: this.route,
    });
  }

  public handleRegister(): void  {
    this.isRegister.pipe(
      filter(Boolean),
      tap(() => this.login())
    ).subscribe();
  }
}
