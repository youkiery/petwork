import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualPage } from './manual.page';

const routes: Routes = [
  {
    path: '',
    component: ManualPage
  },
  {
    path: 'detail',
    loadChildren: () => import('./manualdetail/manualdetail.module').then( m => m.ManualdetailPageModule)
  },
  {
    path: 'insert',
    loadChildren: () => import('./manualinsert/manualinsert.module').then( m => m.ManualinsertPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualPageRoutingModule {}
