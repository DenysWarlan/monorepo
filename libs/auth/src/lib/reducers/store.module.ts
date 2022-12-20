import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { CommonModule } from '@angular/common';
import { AuthState } from './auth.state';
import { AuthService } from './services/auth.service';

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
  providers: [AuthService],
  bootstrap: [],
})
export class StoreModule {}
