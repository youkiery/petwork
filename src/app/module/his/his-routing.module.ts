import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisPage } from './his.page';

const routes: Routes = [
  {
    path: '',
    component: HisPage
  },
  {
    path: 'insert',
    loadChildren: () => import('./hisinsert/hisinsert.module').then( m => m.HisinsertPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./hisdetail/hisdetail.module').then( m => m.HisdetailPageModule)
  },
  {
    path: 'statis',
    loadChildren: () => import('./hisstatis/hisstatis.module').then( m => m.HisstatisPageModule)
  },
  {
    path: 'manager',
    loadChildren: () => import('./hismanager/hismanager.module').then( m => m.HismanagerPageModule)
  },
  {
    path: 'temp',
    loadChildren: () => import('./histemp/histemp.module').then( m => m.HistempPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisPageRoutingModule {}
