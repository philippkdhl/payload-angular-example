import {Injectable, OnDestroy} from '@angular/core';
import {SubSink} from 'subsink';

@Injectable()
export class SubscriptionsAdapterComponent implements OnDestroy {

  protected readonly subs = new SubSink();

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
