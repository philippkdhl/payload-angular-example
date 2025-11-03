import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CmsService} from '../../services/cms-service';
import {ActivatedRoute} from '@angular/router';
import {subscribe, unsubscribe} from '@payloadcms/live-preview';
import {environment} from '../../../../../environments/environment';
import {tap} from 'rxjs';
import {JsonPipe} from '@angular/common';


@Component({
  selector: 'app-cms-page',
  templateUrl: './cms-page.html',
  imports: [
    JsonPipe
  ]
})
export class CmsPage implements OnInit, OnDestroy {

  private readonly route = inject(ActivatedRoute);

  private readonly cmsService = inject(CmsService);

  private subscription?: ReturnType<typeof subscribe>;

  content: string | undefined;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.getDataFromCms();

      this.subscription = subscribe({
        initialData: {},
        serverURL: environment.twoMhCms,
        callback: () => {
          this.getDataFromCms();
        }
      });
    });
  }

  getDataFromCms = () => {
    this.cmsService.getPageBySlug().pipe(
        tap(console.log),
        tap(data => this.content = data)
    ).subscribe();
  };

  ngOnDestroy() {
    if (this.subscription) {
      unsubscribe(this.subscription);
    }
  }


}
