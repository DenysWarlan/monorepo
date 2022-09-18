import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgModule, Optional, SkipSelf} from '@angular/core';
import {environment} from "../../environments/environment";
import {ApiInterceptor} from "./api.interceptor";

@NgModule({
  providers: [
    { provide: 'API_URL', useValue: environment.apiUrl },
    { provide: 'PRODUCTION', useValue: environment.production },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        `CoreModule has already been loaded. Import this module in the AppModule only.`
      );
    }
  }
}
