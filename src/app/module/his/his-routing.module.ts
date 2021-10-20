import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisPage } from './his.page';

const routes: Routes = [
  {
    path: '',
    component: HisPage
  },
  {
    path: 'his/insert',
    loadChildren: () => import('./hisinsert/hisinsert.module').then( m => m.HisinsertPageModule)
  },
  {
    path: 'his/insert',
    loadChildren: () => import('./hisinsert/hisinsert.module').then( m => m.HisinsertPageModule)
  },
  {
    path: 'his/statis',
    loadChildren: () => import('./hisstatis/hisstatis.module').then( m => m.HisstatisPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisPageRoutingModule {}
