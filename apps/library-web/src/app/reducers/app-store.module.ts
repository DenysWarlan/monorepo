import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BooksService} from './library/services/library.service';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {CommonModule} from '@angular/common';
import {AuthState} from '../../../../../libs/auth/data-access/src';


export const GLOBAL_STATES: any[] = [AuthState];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot(GLOBAL_STATES),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [BooksService],
  bootstrap: [],
})
export class AppStoreModule {}