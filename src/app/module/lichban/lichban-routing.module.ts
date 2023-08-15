import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LichbanPage } from './lichban.page';

const routes: Routes = [
  {
    path: '',
    component: LichbanPage
  },
  {
    path: 'them',
    loadChildren: () => import('./lichbanthem/lichbanthem.module').then( m => m.LichbanthemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichbanPageRoutingModule {}
