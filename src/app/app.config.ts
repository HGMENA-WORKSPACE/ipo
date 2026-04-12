import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      })
    }),
    // importProvidersFrom([
    //   TranslateModule.forRoot({
    //     useDefaultLang: true,
    //     defaultLanguage: 'en',
    //     loader: {
    //       provide: TranslateLoader,
    //       useFactory: () => new TranslateHttpLoader(),
    //       deps: [HttpClient],
    //     },
    //   }),
    // ]),
  ],
};
