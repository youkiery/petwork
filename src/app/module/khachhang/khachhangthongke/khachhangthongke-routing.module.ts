import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KhachhangthongkePage } from './khachhangthongke.page';

const routes: Routes = [
  {
    path: '',
    component: KhachhangthongkePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KhachhangthongkePageRoutingModule {}
