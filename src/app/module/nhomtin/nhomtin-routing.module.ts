import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NhomtinPage } from './nhomtin.page';

const routes: Routes = [
  {
    path: '',
    component: NhomtinPage
  },
  {
    path: 'them',
    loadChildren: () => import('./themnhomtin/themnhomtin.module').then( m => m.ThemnhomtinPageModule)
  },
  {
    path: 'chitiet',
    loadChildren: () => import('./chitietnhomtin/chitietnhomtin.module').then( m => m.ChitietnhomtinPageModule)
  },
  {
    path: 'tim',
    loadChildren: () => import('./timnhomtin/timnhomtin.module').then( m => m.TimnhomtinPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NhomtinPageRoutingModule {}
