import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VattuPage } from './vattu.page';

const routes: Routes = [
  {
    path: '',
    component: VattuPage
  },
  {
    path: 'them',
    loadChildren: () => import('./vattuthem/vattuthem.module').then( m => m.VattuthemPageModule)
  },
  {
    path: 'chontang',
    loadChildren: () => import('./vattuchontang/vattuchontang.module').then( m => m.VattuchontangPageModule)
  },
  {
    path: 'tang',
    loadChildren: () => import('./vattutang/vattutang.module').then( m => m.VattutangPageModule)
  },
  {
    path: 'cophan',
    loadChildren: () => import('./vattucophan/vattucophan.module').then( m => m.VattucophanPageModule)
  },
  {
    path: 'themcophan',
    loadChildren: () => import('./vattuthemcophan/vattuthemcophan.module').then( m => m.VattuthemcophanPageModule)
  },
  {
    path: 'vattuimport',
    loadChildren: () => import('./vattuimport/vattuimport.module').then( m => m.VattuimportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VattuPageRoutingModule {}
