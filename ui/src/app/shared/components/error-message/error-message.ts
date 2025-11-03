import {Component, input} from '@angular/core';

@Component({
  selector: 'app-error-message',
  imports: [],
  templateUrl: './error-message.html',
})
export class ErrorMessage {

  errorMessages = input<string[]>();
}
