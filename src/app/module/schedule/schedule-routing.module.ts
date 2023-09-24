import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulePage } from './schedule.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulePage
  },
  {
    path: 'thongke',
    loadChildren: () => import('./schedulethongke/schedulethongke.module').then( m => m.SchedulethongkePageModule)
  },
  {
    path: 'lichban',
    loadChildren: () => import('./schedulelichban/schedulelichban.module').then( m => m.SchedulelichbanPageModule)
  },
  {
    path: 'chamcong',
    loadChildren: () => import('./schedulechamcong/schedulechamcong.module').then( m => m.SchedulechamcongPageModule)
  },
  {
    path: 'cauhinh',
    loadChildren: () => import('./schedulecauhinhchamcong/schedulecauhinhchamcong.module').then( m => m.SchedulecauhinhchamcongPageModule)
  },  {
    path: 'schedulethemlichban',
    loadChildren: () => import('./schedulethemlichban/schedulethemlichban.module').then( m => m.SchedulethemlichbanPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulePageRoutingModule {}
