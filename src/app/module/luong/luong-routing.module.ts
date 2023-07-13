import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuongPage } from './luong.page';

const routes: Routes = [
  {
    path: '',
    component: LuongPage
  },
  {
    path: 'nhanvien',
    loadChildren: () => import('./luongnhanvien/luongnhanvien.module').then( m => m.LuongnhanvienPageModule)
  },
  {
    path: 'thang',
    loadChildren: () => import('./luongthang/luongthang.module').then( m => m.LuongthangPageModule)
  },
  {
    path: 'nam',
    loadChildren: () => import('./luongnam/luongnam.module').then( m => m.LuongnamPageModule)
  },
  {
    path: 'themnhanvien',
    loadChildren: () => import('./luongthemnhanvien/luongthemnhanvien.module').then( m => m.LuongthemnhanvienPageModule)
  },
  {
    path: 'timnhanvien',
    loadChildren: () => import('./luongtimnhanvien/luongtimnhanvien.module').then( m => m.LuongtimnhanvienPageModule)
  },
  {
    path: 'chonngay',
    loadChildren: () => import('./luonglenluong/luonglenluong.module').then( m => m.LuonglenluongPageModule)
  },
  {
    path: 'themnhanvien2',
    loadChildren: () => import('./luongthemnhanvien2/luongthemnhanvien2.module').then( m => m.Luongthemnhanvien2PageModule)
  },
  {
    path: 'chitiet',
    loadChildren: () => import('./luongchitiet/luongchitiet.module').then( m => m.LuongchitietPageModule)
  },
  {
    path: 'capnhatnhanvien',
    loadChildren: () => import('./luongcapnhatnhanvien/luongcapnhatnhanvien.module').then( m => m.LuongcapnhatnhanvienPageModule)
  },
  {
    path: 'nhaptay',
    loadChildren: () => import('./luongnhaptay/luongnhaptay.module').then( m => m.LuongnhaptayPageModule)
  },
  {
    path: 'sosanh',
    loadChildren: () => import('./luongsosanh/luongsosanh.module').then( m => m.LuongsosanhPageModule)
  },
  {
    path: 'mucchi',
    loadChildren: () => import('./luongmucchi/luongmucchi.module').then( m => m.LuongmucchiPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuongPageRoutingModule {}
