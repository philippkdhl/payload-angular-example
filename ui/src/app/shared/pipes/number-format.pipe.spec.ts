import {NumberFormatPipe} from './number-format.pipe';
import {TranslateService} from '@ngx-translate/core';

describe('NumberFormatPipe', () => {
  let translateServiceMock: jest.Mocked<TranslateService>;
  let pipe: NumberFormatPipe;

  beforeEach(() => {
    // Given: a mocked TranslateService
    translateServiceMock = {getCurrentLang: jest.fn()} as any;
    pipe = new NumberFormatPipe(translateServiceMock);
  });

  it('should format number with de locale', () => {
    // Given: locale is "de"
    translateServiceMock.getCurrentLang.mockReturnValue('de');

    // When: transform is called without digits
    const result = pipe.transform(1234567.89);

    // Then: result should be rounded and formatted in German
    expect(result).toBe('1.234.567,89');
  });

  it('should format number with en locale', () => {

    // Given: locale is "en"
    translateServiceMock.getCurrentLang.mockReturnValue('en');

    // When: transform is called with 2 digits
    const result = pipe.transform(1234567.89);

    // Then: result should be formatted with 2 decimals in English
    expect(result).toBe('1,234,567.89');
  });

  it('should return empty string on undefined value', () => {

    // Given
    translateServiceMock.getCurrentLang.mockReturnValue('de');

    // When
    const result = pipe.transform(undefined);

    // Then
    expect(result).toBe('');
  });
});
