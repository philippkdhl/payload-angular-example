import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Subject, of } from 'rxjs';
import { CmsService } from '../../services/cms-service';
import { CmsPageParser } from '../../services/parser/cms-page-parser';
import { CmsPage } from './cms-page';

// Mock für @payloadcms/live-preview
jest.mock('@payloadcms/live-preview', () => ({
  subscribe: jest.fn(),
  unsubscribe: jest.fn()
}));

describe('CmsPage', () => {
  let component: CmsPage;
  let mockCmsService: jest.Mocked<CmsService>;
  let mockCmsPageParser: jest.Mocked<CmsPageParser>;
  let paramMapSubject: Subject<any>;

  beforeEach(() => {
    paramMapSubject = new Subject();

    const cmsServiceSpy = {
      getPageBySlug: jest.fn()
    };

    const cmsPageParserSpy = {
      parseCmsJsonToElements: jest.fn()
    };

    const activatedRouteSpy = {
      paramMap: paramMapSubject.asObservable()
    };

    TestBed.configureTestingModule({
      imports: [CmsPage],
      providers: [
        { provide: CmsService, useValue: cmsServiceSpy },
        { provide: CmsPageParser, useValue: cmsPageParserSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    });

    const fixture = TestBed.createComponent(CmsPage);
    component = fixture.componentInstance;

    mockCmsService = TestBed.inject(CmsService) as jest.Mocked<CmsService>;
    mockCmsPageParser = TestBed.inject(CmsPageParser) as jest.Mocked<CmsPageParser>;
  });

  afterEach(() => {
    paramMapSubject.complete();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should subscribe to route params and load page data', () => {
      const testSlug = 'test-page';
      const testLocale = 'de';

      const mockResponse = { docs: [{}] } as any;
      const parsed = [{ type: 'dummy' }];

      mockCmsService.getPageBySlug.mockReturnValue(of(mockResponse));
      mockCmsPageParser.parseCmsJsonToElements.mockReturnValue(parsed as any);

      component.ngOnInit();
      paramMapSubject.next(new Map([['slug', testSlug], ['locale', testLocale]]));

      expect(mockCmsService.getPageBySlug).toHaveBeenCalledWith(testSlug, testLocale, true);
      expect(mockCmsPageParser.parseCmsJsonToElements).toHaveBeenCalledWith(mockResponse.docs[0]);
      expect((component as any).content).toEqual(parsed);
    });

    it('should handle empty slug parameter', () => {
      const mockResponse = { docs: [{}] } as any;
      mockCmsService.getPageBySlug.mockReturnValue(of(mockResponse));
      mockCmsPageParser.parseCmsJsonToElements.mockReturnValue([] as any);

      component.ngOnInit();
      // emit an empty Map (no slug)
      paramMapSubject.next(new Map());

      expect(mockCmsService.getPageBySlug).toHaveBeenCalledWith('', 'de', true);
    });

    it('should set up an interval that periodically refreshes data', () => {
      jest.useFakeTimers();

      const testSlug = 'interval-page';
      const testLocale = 'en';
      const mockResponse = { docs: [{}] } as any;

      mockCmsService.getPageBySlug.mockReturnValue(of(mockResponse));
      mockCmsPageParser.parseCmsJsonToElements.mockReturnValue([] as any);

      component.ngOnInit();
      paramMapSubject.next(new Map([['slug', testSlug], ['locale', testLocale]]));

      // initial call
      expect(mockCmsService.getPageBySlug).toHaveBeenCalledWith(testSlug, testLocale, true);

      // advance timers to trigger the interval callback once
      jest.advanceTimersByTime(1000);

      // now it should have been called at least twice (initial + one interval)
      expect(mockCmsService.getPageBySlug).toHaveBeenCalledTimes(2);
    });
  });

  describe('ngOnDestroy', () => {
    it('should clear interval when set', () => {
      jest.useFakeTimers();

      const testSlug = 'to-destroy';
      const mockResponse = { docs: [{}] } as any;
      mockCmsService.getPageBySlug.mockReturnValue(of(mockResponse));
      mockCmsPageParser.parseCmsJsonToElements.mockReturnValue([] as any);

      const clearSpy = jest.spyOn(window as any, 'clearInterval');

      component.ngOnInit();
      paramMapSubject.next(new Map([['slug', testSlug]]));

      // ensure interval is set
      expect((component as any).intervalId).toBeDefined();

      component.ngOnDestroy();

      expect(clearSpy).toHaveBeenCalled();
    });

    it('should not throw if no interval exists', () => {
      const clearSpy = jest.spyOn(window as any, 'clearInterval');

      // intervalId is undefined by default
      component.ngOnDestroy();

      expect(clearSpy).not.toHaveBeenCalled();
    });
  });
});

