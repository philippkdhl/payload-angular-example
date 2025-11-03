import {Component, OnInit, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  private static readonly SUPPORTED_LANGUAGES = ['de', 'en'];
  public static readonly FALLBACK_LANGUAGE = 'en';
  public static readonly DEFAULT_LANGUAGE = 'de';

  protected readonly title = signal('ui');


  ngOnInit(): void {
  }

}
