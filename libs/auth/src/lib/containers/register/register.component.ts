import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from '../../reducers/actions/register.actions';
import { AuthState } from '../../reducers/auth.state';
import { filter, Observable, tap } from 'rxjs';
import {Login} from '../../models/login.model';

@Component({
  selector: 'monorepo-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  private charsCount: number = 6;
  private isRegister: Observable<boolean> = this.store.select(
    AuthState.isRegister
  );
  constructor(
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
    const data: Login = this.form.value;
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
