import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KhachhangPage } from './khachhang.page';

const routes: Routes = [
  {
    path: '',
    component: KhachhangPage
  },
  {
    path: 'homnay',
    loadChildren: () => import('./khachhanghomnay/khachhanghomnay.module').then( m => m.KhachhanghomnayPageModule)
  },
  {
    path: 'henngay',
    loadChildren: () => import('./khachhanghenngay/khachhanghenngay.module').then( m => m.KhachhanghenngayPageModule)
  },
  {
    path: 'chuyenmon',
    loadChildren: () => import('./khachhangchuyenmon/khachhangchuyenmon.module').then( m => m.KhachhangchuyenmonPageModule)
  },
  {
    path: 'danhgia',
    loadChildren: () => import('./khachhangdanhgia/khachhangdanhgia.module').then( m => m.KhachhangdanhgiaPageModule)
  },
  {
    path: 'chinhanh',
    loadChildren: () => import('./khachhangchinhanh/khachhangchinhanh.module').then( m => m.KhachhangchinhanhPageModule)
  },
  {
    path: 'themchinhanh',
    loadChildren: () => import('./khachhangthemchinhanh/khachhangthemchinhanh.module').then( m => m.KhachhangthemchinhanhPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhachhangPageRoutingModule {}
