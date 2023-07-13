import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SieuamPage } from './sieuam.page';

const routes: Routes = [
  {
    path: '',
    component: SieuamPage
  },
  {
    path: 'insert',
    loadChildren: () => import('./sieuaminsert/sieuaminsert.module').then( m => m.SieuaminsertPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SieuamPageRoutingModule {}
