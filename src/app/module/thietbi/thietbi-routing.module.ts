import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThietbiPage } from './thietbi.page';

const routes: Routes = [
  {
    path: '',
    component: ThietbiPage
  },
  {
    path: 'them',
    loadChildren: () => import('./themthietbi/themthietbi.module').then( m => m.ThemthietbiPageModule)
  },
  {
    path: 'chitiet',
    loadChildren: () => import('./chitietthietbi/chitietthietbi.module').then( m => m.ChitietthietbiPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThietbiPageRoutingModule {}
