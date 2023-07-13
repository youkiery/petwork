import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkPage } from './work.page';

const routes: Routes = [
  {
    path: '',
    component: WorkPage
  },
  {
    path: 'insert',
    loadChildren: () => import('./workinsert/workinsert.module').then( m => m.WorkinsertPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./workdetail/workdetail.module').then( m => m.WorkdetailPageModule)
  },
  {
    path: 'depart',
    loadChildren: () => import('./workdepart/workdepart.module').then( m => m.WorkdepartPageModule)
  },
  {
    path: 'departinsert',
    loadChildren: () => import('./workdepartinsert/workdepartinsert.module').then( m => m.WorkdepartinsertPageModule)
  },
  {
    path: 'insertfollow',
    loadChildren: () => import('./workinsertfollow/workinsertfollow.module').then( m => m.WorkinsertfollowPageModule)
  },
  {
    path: 'filter',
    loadChildren: () => import('./workfilter/workfilter.module').then( m => m.WorkfilterPageModule)
  },
  {
    path: 'statistic',
    loadChildren: () => import('./workstatistic/workstatistic.module').then( m => m.WorkstatisticPageModule)
  },
  {
    path: 'repeat',
    loadChildren: () => import('./workrepeat/workrepeat.module').then( m => m.WorkrepeatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkPageRoutingModule {}
