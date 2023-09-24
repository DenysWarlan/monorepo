import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppStoreModule} from './reducers/app-store.module';
import {AuthorizedModule} from './authorized/authorized.module';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppMaterialModule} from './material.module';
import {CommonModule} from '@angular/common';
import {AuthGuard} from './core/guards/auth.guard';
import {CoreModule} from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppStoreModule,
    AuthorizedModule,
    AppRoutingModule,
    RouterModule,
    CoreModule,
    AppMaterialModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
