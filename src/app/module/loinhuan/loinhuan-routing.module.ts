import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoinhuanPage } from './loinhuan.page';

const routes: Routes = [
  {
    path: '',
    component: LoinhuanPage
  },
  {
    path: 'cauhinh',
    loadChildren: () => import('./loinhuancauhinh/loinhuancauhinh.module').then( m => m.LoinhuancauhinhPageModule)
  },
  {
    path: 'themcauhinh',
    loadChildren: () => import('./loinhuanthemcauhinh/loinhuanthemcauhinh.module').then( m => m.LoinhuanthemcauhinhPageModule)
  },
  {
    path: 'doanhthu',
    loadChildren: () => import('./loinhuandoanhthu/loinhuandoanhthu.module').then( m => m.LoinhuandoanhthuPageModule)
  },
  {
    path: 'taichinh',
    loadChildren: () => import('./loinhuantaichinh/loinhuantaichinh.module').then( m => m.LoinhuantaichinhPageModule)
  },
  {
    path: 'nhap',
    loadChildren: () => import('./loinhuannhap/loinhuannhap.module').then( m => m.LoinhuannhapPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoinhuanPageRoutingModule {}
