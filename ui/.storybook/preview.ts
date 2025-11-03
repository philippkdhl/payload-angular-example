import {applicationConfig, type Preview} from '@storybook/angular'
import {provideTranslateService, TranslateService} from '@ngx-translate/core';
import {provideTranslateHttpLoader} from '@ngx-translate/http-loader';
import {provideHttpClient} from '@angular/common/http';
import {importProvidersFrom, inject, provideAppInitializer} from '@angular/core';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {CmsService} from '../src/app/features/cms/services/cms-service';
import {CmsServiceMock} from '../src/app/features/cms/services/cms-service.mock';
import {firstValueFrom} from 'rxjs';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },

  decorators: [
    applicationConfig({
      providers: [
        {provide: CmsService, useClass: CmsServiceMock},
        provideHttpClient(),
        provideTranslateService({
          loader: provideTranslateHttpLoader({
            prefix: '/assets/i18n/',
            suffix: '.json'
          }),
          lang: 'de'
        }),
        provideAppInitializer(() => {
          const translateService = inject(TranslateService);
          translateService.setFallbackLang('de');
          return firstValueFrom(translateService.use('de'));
        }),
        importProvidersFrom(LoggerModule.forRoot({
          serverLoggingUrl: '/api/logs',
          level: NgxLoggerLevel.INFO,
          serverLogLevel: NgxLoggerLevel.ERROR
        })),
      ]
    })
  ]
};

export default preview;
