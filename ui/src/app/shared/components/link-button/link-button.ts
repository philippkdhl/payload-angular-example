import { Component, input } from '@angular/core';

@Component({
  selector: 'app-link-button',
  imports: [],
  templateUrl: './link-button.html',
  styleUrl: './link-button.scss'
})
export class LinkButton {

  linkUrl = input<string>('');

  linkText = input<string>('');

  linkExternal = input<boolean>(false);

}
