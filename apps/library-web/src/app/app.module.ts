import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppStoreModule} from './reducers/app-store.module';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {AppMaterialModule} from './material.module';
import {CommonModule} from '@angular/common';
import {AuthGuard} from './core/guards/auth.guard';
import {CoreModule} from './core/core.module';
import {NavigationComponent} from '../../../../libs/navigation/src/navigation.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppStoreModule,
    AppRoutingModule,
    CoreModule,
    AppMaterialModule,
    NavigationComponent,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
