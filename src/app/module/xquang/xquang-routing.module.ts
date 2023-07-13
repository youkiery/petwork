import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XquangPage } from './xquang.page';

const routes: Routes = [
  {
    path: '',
    component: XquangPage
  },
  {
    path: 'insert',
    loadChildren: () => import('./xquanginsert/xquanginsert.module').then( m => m.XquanginsertPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XquangPageRoutingModule {}
