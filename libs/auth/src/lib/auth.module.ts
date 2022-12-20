import { Route, RouterModule } from '@angular/router';
import { LoginComponent } from './containers/login/login.component';
import { RegisterComponent } from './containers/register/register.component';
import { CommonModule } from '@angular/common';
import { StoreModule } from './reducers/store.module';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

const MATERIALS_MODULES = [
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  ReactiveFormsModule,
  MatCardModule,
  MatFormFieldModule,
];

export const authRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule, StoreModule, MATERIALS_MODULES],
  declarations: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
