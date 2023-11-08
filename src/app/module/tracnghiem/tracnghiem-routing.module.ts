import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TracnghiemPage } from './tracnghiem.page';

const routes: Routes = [
  {
    path: '',
    component: TracnghiemPage
  },
  {
    path: 'baithi',
    loadChildren: () => import('./tracnghiembaithi/tracnghiembaithi.module').then( m => m.TracnghiembaithiPageModule)
  },
  {
    path: 'chitiet',
    loadChildren: () => import('./tracnghiemchitiet/tracnghiemchitiet.module').then( m => m.TracnghiemchitietPageModule)
  },
  {
    path: 'capnhat',
    loadChildren: () => import('./tracnghiemcapnhat/tracnghiemcapnhat.module').then( m => m.TracnghiemcapnhatPageModule)
  },
  {
    path: 'ketqua',
    loadChildren: () => import('./tracnghiemketqua/tracnghiemketqua.module').then( m => m.TracnghiemketquaPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracnghiemPageRoutingModule {}
