import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgxsModule} from '@ngxs/store';
import {NgxsReduxDevtoolsPluginModule} from '@ngxs/devtools-plugin';
import {CommonModule} from '@angular/common';
import {AuthState, RegisterState} from '@monorepo/auth/data-access';
import {NgxsStoragePluginModule, StorageOption} from '@ngxs/storage-plugin';
import {BookState, GoogleBookService, FavoriteBookState} from '@monorepo/books/data-access';
import {UserState} from '@monorepo/profile/data-access';


export const GLOBAL_STATES: any[] = [
    AuthState,
    RegisterState,
    BookState,
    FavoriteBookState,
    UserState
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    NgxsStoragePluginModule.forRoot({
      key: [
          AuthState,
          BookState,
          FavoriteBookState
      ],
      storage: StorageOption.LocalStorage,
      deserialize: JSON.parse,
      serialize: JSON.stringify
    },
    ),
    NgxsModule.forRoot(GLOBAL_STATES),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: false
    }),
  ],
  providers: [GoogleBookService],
  bootstrap: [],
})
export class AppStoreModule {}
