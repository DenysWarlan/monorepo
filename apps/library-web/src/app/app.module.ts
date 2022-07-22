import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from './reducers/store.module';
import { AuthorizedModule } from './authorized/authorized.module';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './material.module';
import { AuthModule } from './auth/auth.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule,
    AuthorizedModule,
    AppRoutingModule,
    RouterModule,
    AuthModule,
    AppMaterialModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
