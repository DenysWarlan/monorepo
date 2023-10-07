import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatInputModule} from "@angular/material/input";
import { MatFormFieldModule } from '@angular/material/form-field';
import {ErrorFormComponent} from "../../../../../error-form/src/lib/error-form.component";
import {RegisterForm} from "@monorepo/auth/data-access";
import {Store} from "@ngxs/store";
import {UpdateUserData} from "@monorepo/profile/data-access";
import {UpdateUserDto} from "../../../../data-access/src/dto/update-user.model.dto";
import {MatDatepickerModule} from "@angular/material/datepicker";

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
    MatDatepickerModule
  ],
  templateUrl: './edit-settings.component.html',
  styleUrls: ['./edit-settings.component.scss'],
})
export class EditSettingsComponent {

  public form: FormGroup<RegisterForm> = this.fb.group({
    name: this.fb.control(''),
    birthDate: this.fb.control(''),
    email: this.fb.control('', [Validators.email]),
    password: this.fb.control(''),
  });

  public constructor (
    private fb: FormBuilder,
    private store: Store
  ) {}

  public submitForm(): void {
    const data: UpdateUserDto = this.form.value as any as UpdateUserDto;
    this.store.dispatch(new UpdateUserData(data))
  }
}
