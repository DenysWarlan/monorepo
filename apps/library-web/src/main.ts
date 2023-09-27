import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';

if (process.env['NODE_ENV'] === 'production') {
  enableProdMode();
}

// This is defined in our .env file.
console.log('>>> NX_API_URL', process.env['NX_API_URL']);

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
