import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KhachhanghenngayPage } from './khachhanghenngay.page';

const routes: Routes = [
  {
    path: '',
    component: KhachhanghenngayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhachhanghenngayPageRoutingModule {}
