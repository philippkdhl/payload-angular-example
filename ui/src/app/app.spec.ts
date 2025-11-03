import {TestBed} from '@angular/core/testing';
import {App} from './app';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {MockProviders} from 'ng-mocks';
import {NavigationService} from './core/layout/services/navigation-service';
import {LoggingService} from './core/services/logging/logging.service';

describe('App', () => {

  let translateService: TranslateService;
  let loggingService: LoggingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App, TranslateModule.forRoot({})],
      providers: [TranslateService, MockProviders(NavigationService, LoggingService)]
    }).compileComponents();

    translateService = TestBed.inject(TranslateService);
    loggingService = TestBed.inject(LoggingService);
  });

  it('should initialize i18n from browser with supported language', () => {
    // Given
    jest.spyOn(translateService, 'addLangs');
    jest.spyOn(translateService, 'setFallbackLang');
    jest.spyOn(translateService, 'use');
    jest.spyOn(loggingService, 'initializeLoggingLevel');
    Object.defineProperty(window.navigator, 'language', {value: 'de-DE', configurable: true});

    // When
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.ngOnInit();

    // Then
    expect(translateService.addLangs).toHaveBeenCalledWith(['de', 'en']);
    expect(translateService.setFallbackLang).toHaveBeenCalledWith('en');
    expect(translateService.use).toHaveBeenCalledWith('de');
    expect(loggingService.initializeLoggingLevel).toHaveBeenCalled();

    expect(app).toBeTruthy();
  });


  it('should initialize i18n from browser with unsupported language using fallback', () => {
    jest.spyOn(translateService, 'addLangs');
    jest.spyOn(translateService, 'setFallbackLang');
    jest.spyOn(translateService, 'use');
    Object.defineProperty(window.navigator, 'language', {value: 'es', configurable: true});

    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.ngOnInit();

    expect(translateService.use).toHaveBeenCalledWith('en');
    expect(app).toBeTruthy();
  });

});
