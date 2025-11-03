import {Routes} from '@angular/router';
import {CmsPage} from './features/cms/pages/cms-page/cms-page';
import {ROUTE_PAGE_PATH} from './route-constants';

export const routes: Routes = [
  {
    path: `${ROUTE_PAGE_PATH}`,
    component: CmsPage,
    title: 'CMS',
  },
  {
    path: `${ROUTE_PAGE_PATH}/:locale`,
    component: CmsPage,
    title: 'CMS',
  },

];
