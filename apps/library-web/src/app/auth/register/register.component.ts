import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Register } from '../../reducers/auth/actions/register.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public form!: FormGroup;
  public charsCount: number = 6;

  constructor(private store: Store, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required, Validators.minLength(this.charsCount)]),
    });

    this.form.valueChanges.subscribe(x => console.log(this.form));
  }

  submitForm() {
    const params: any = this.form.value;
    this.store.dispatch(new Register({ data: params }));
  }

  login() {
    this.router.navigate(['/login'], {
      relativeTo: this.route,
    });
  }
}
