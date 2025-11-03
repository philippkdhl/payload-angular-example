import {Pipe, PipeTransform} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

/**
 * pipe to convert values into localized number with decimal separator and digit grouping
 */
@Pipe({
  name: 'nlsNumber'
})
export class NumberFormatPipe implements PipeTransform {

  constructor(private readonly translate: TranslateService) {
  }

  transform(value: number | undefined): any { // NOSONAR typescript:S4204 Implements an interface of Angular that already contains the any type
    if (value === undefined) {
      return '';
    }
    return new Intl.NumberFormat(this.translate.getCurrentLang()).format(value);
  }

}
