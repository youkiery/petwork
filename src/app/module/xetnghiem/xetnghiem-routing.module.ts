import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XetnghiemPage } from './xetnghiem.page';

const routes: Routes = [
  {
    path: '',
    component: XetnghiemPage
  },
  {
    path: 'chitiet',
    loadChildren: () => import('./xetnghiemchitiet/xetnghiemchitiet.module').then( m => m.XetnghiemchitietPageModule)
  },
  {
    path: 'in',
    loadChildren: () => import('./xetnghiemin/xetnghiemin.module').then( m => m.XetnghieminPageModule)
  },
  {
    path: 'them',
    loadChildren: () => import('./xetnghiemthem/xetnghiemthem.module').then( m => m.XetnghiemthemPageModule)
  },
  {
    path: 'xetnghiemthemchitieu',
    loadChildren: () => import('./xetnghiemthemchitieu/xetnghiemthemchitieu.module').then( m => m.XetnghiemthemchitieuPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XetnghiemPageRoutingModule {}
