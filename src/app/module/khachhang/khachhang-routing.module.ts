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
  },
  {
    path: 'thongke',
    loadChildren: () => import('./khachhangthongke/khachhangthongke.module').then( m => m.KhachhangthongkePageModule)
  },
  {
    path: 'gopy',
    loadChildren: () => import('./gopy/gopy.module').then( m => m.GopyPageModule)
  },
  {
    path: 'thongkedanhgia',
    loadChildren: () => import('./thongkedanhgia/thongkedanhgia.module').then( m => m.ThongkedanhgiaPageModule)
  },
  {
    path: 'cauhinh',
    loadChildren: () => import('./cauhinhkhachhang/cauhinhkhachhang.module').then( m => m.CauhinhkhachhangPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhachhangPageRoutingModule {}
