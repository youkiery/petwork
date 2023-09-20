import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KhachhangthemchinhanhPage } from './khachhangthemchinhanh.page';

const routes: Routes = [
  {
    path: '',
    component: KhachhangthemchinhanhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhachhangthemchinhanhPageRoutingModule {}
