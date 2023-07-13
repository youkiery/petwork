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
    path: 'temp',
    loadChildren: () => import('./histemp/histemp.module').then( m => m.HistempPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'result',
    loadChildren: () => import('./hisresult/hisresult.module').then( m => m.HisresultPageModule)
  },
  {
    path: 'exam',
    loadChildren: () => import('./hisexam/hisexam.module').then( m => m.HisexamPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./hisschedule/hisschedule.module').then( m => m.HisschedulePageModule)
  },
  {
    path: 'disease',
    loadChildren: () => import('./hisdisease/hisdisease.module').then( m => m.HisdiseasePageModule)
  },
  {
    path: 'images',
    loadChildren: () => import('./hisimages/hisimages.module').then( m => m.HisimagesPageModule)
  },
  {
    path: 'print',
    loadChildren: () => import('./hisprint/hisprint.module').then( m => m.HisprintPageModule)
  },
  {
    path: 'insertdisease',
    loadChildren: () => import('./hisdinsertisease/hisdinsertisease.module').then( m => m.HisdinsertiseasePageModule)
  },
  {
    path: 'statisdisease',
    loadChildren: () => import('./hisstatisdisease/hisstatisdisease.module').then( m => m.HisstatisdiseasePageModule)
  },
  {
    path: 'statistic2',
    loadChildren: () => import('./hisstatistic2/hisstatistic2.module').then( m => m.Hisstatistic2PageModule)
  },
  {
    path: 'xemdieutri',
    loadChildren: () => import('./hisxemdieutri/hisxemdieutri.module').then( m => m.HisxemdieutriPageModule)
  },
  {
    path: 'xemchitietdieutri',
    loadChildren: () => import('./hisxemchitietdieutri/hisxemchitietdieutri.module').then( m => m.HisxemchitietdieutriPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisPageRoutingModule {}
