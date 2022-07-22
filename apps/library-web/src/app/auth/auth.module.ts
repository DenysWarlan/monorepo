import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterComponent } from './register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppMaterialModule } from '../material.module';

@NgModule({
  declarations: [LoginPageComponent, RegisterComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppMaterialModule, RouterModule],
  providers: [],
  bootstrap: [],
})
export class AuthModule {}
