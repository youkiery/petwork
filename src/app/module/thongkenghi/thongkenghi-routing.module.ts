import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongkenghiPage } from './thongkenghi.page';

const routes: Routes = [
  {
    path: '',
    component: ThongkenghiPage
  },
  {
    path: 'cauhinh',
    loadChildren: () => import('./thongkenghicauhinh/thongkenghicauhinh.module').then( m => m.ThongkenghicauhinhPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongkenghiPageRoutingModule {}
