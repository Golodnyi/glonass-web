import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { env } from './env';
import { AppModule } from './app/app.module';

if (env.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
