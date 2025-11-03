import {ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {provideTranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {provideHttpClient} from '@angular/common/http';
import {routes} from './app.routes';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'de'
    }),
    importProvidersFrom(LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.INFO,
      serverLogLevel: NgxLoggerLevel.ERROR
    })),
  ]
};
