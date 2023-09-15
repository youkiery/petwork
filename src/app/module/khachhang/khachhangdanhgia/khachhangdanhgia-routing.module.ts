import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KhachhangdanhgiaPage } from './khachhangdanhgia.page';

const routes: Routes = [
  {
    path: '',
    component: KhachhangdanhgiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhachhangdanhgiaPageRoutingModule {}
