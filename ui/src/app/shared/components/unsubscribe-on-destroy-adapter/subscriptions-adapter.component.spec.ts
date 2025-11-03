import {SubscriptionsAdapterComponent} from './subscriptions-adapter.component';
import {Observable, Subscription} from 'rxjs';

describe('SubscriptionsComponent', () => {

  it('should unsubscribe registered Subscriptions on Destruction', () => {
    // given
    const subscription: Subscription = new Observable().subscribe();

    const extendingComponent = new (class extends SubscriptionsAdapterComponent {
      constructor() {
        super();
        this.subs.sink = subscription;
      }
    })();

    // when
    extendingComponent.ngOnDestroy();

    // then
    expect(subscription.closed).toBeTruthy();
  });
});
