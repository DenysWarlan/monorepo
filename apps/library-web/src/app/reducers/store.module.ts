import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BooksService } from './library/services/library.service';
import { AuthService } from './auth/services/auth.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { environment } from '../../environments/environment';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './auth/auth.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CommonModule } from '@angular/common';

export const GLOBAL_STATES: any[] = [AuthState];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot(GLOBAL_STATES, { developmentMode: !environment.production }),
    NgxsReduxDevtoolsPluginModule.forRoot({ disabled: environment.production }),
  ],
  providers: [AuthService, AuthGuard, BooksService],
  bootstrap: [],
})
export class StoreModule {}
