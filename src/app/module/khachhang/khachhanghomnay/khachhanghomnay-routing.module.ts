import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KhachhanghomnayPage } from './khachhanghomnay.page';

const routes: Routes = [
  {
    path: '',
    component: KhachhanghomnayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhachhanghomnayPageRoutingModule {}
