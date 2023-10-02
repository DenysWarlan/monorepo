import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BooksService} from './library/services/library.service';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {CommonModule} from '@angular/common';
import {AuthState, RegisterState} from '@monorepo/auth/data-access';
import {NgxsStoragePluginModule, StorageOption} from '@ngxs/storage-plugin';


export const GLOBAL_STATES: any[] = [
    AuthState,
    RegisterState
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgxsStoragePluginModule.forRoot({
      key: AuthState,
      storage: StorageOption.LocalStorage,
      deserialize: JSON.parse,
      serialize: JSON.stringify
    }),
    NgxsModule.forRoot(GLOBAL_STATES),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: false
    }),
  ],
  providers: [BooksService],
  bootstrap: [],
})
export class AppStoreModule {}
