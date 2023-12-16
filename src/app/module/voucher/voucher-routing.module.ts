import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoucherPage } from './voucher.page';

const routes: Routes = [
  {
    path: '',
    component: VoucherPage
  },
  {
    path: 'them',
    loadChildren: () => import('./themvoucher/themvoucher.module').then( m => m.ThemvoucherPageModule)
  },
  {
    path: 'tracuu',
    loadChildren: () => import('./tracuuvoucher/tracuuvoucher.module').then( m => m.TracuuvoucherPageModule)
  },
  {
    path: 'cauhinh',
    loadChildren: () => import('./cauhinhvoucher/cauhinhvoucher.module').then( m => m.CauhinhvoucherPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoucherPageRoutingModule {}
