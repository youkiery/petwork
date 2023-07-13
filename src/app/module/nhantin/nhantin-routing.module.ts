import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NhantinPage } from './nhantin.page';

const routes: Routes = [
  {
    path: '',
    component: NhantinPage
  },
  {
    path: 'cauhinhnhantin',
    loadChildren: () => import('./cauhinhnhantin/cauhinhnhantin.module').then( m => m.CauhinhnhantinPageModule)
  },
  {
    path: 'themcauhinh',
    loadChildren: () => import('./themcauhinh/themcauhinh.module').then( m => m.ThemcauhinhPageModule)
  },
  {
    path: 'cauhinhnhantin',
    loadChildren: () => import('./cauhinhnhantin/cauhinhnhantin.module').then( m => m.CauhinhnhantinPageModule)
  },
  {
    path: 'tindagui',
    loadChildren: () => import('./tindagui/tindagui.module').then( m => m.TindaguiPageModule)
  },
  {
    path: 'thongke',
    loadChildren: () => import('./thongkenhantin/thongkenhantin.module').then( m => m.ThongkenhantinPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NhantinPageRoutingModule {}
