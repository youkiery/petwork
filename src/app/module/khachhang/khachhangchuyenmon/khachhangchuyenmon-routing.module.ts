import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KhachhangchuyenmonPage } from './khachhangchuyenmon.page';

const routes: Routes = [
  {
    path: '',
    component: KhachhangchuyenmonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhachhangchuyenmonPageRoutingModule {}
