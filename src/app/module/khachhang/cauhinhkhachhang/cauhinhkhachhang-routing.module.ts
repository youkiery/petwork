import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CauhinhkhachhangPage } from './cauhinhkhachhang.page';

const routes: Routes = [
  {
    path: '',
    component: CauhinhkhachhangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CauhinhkhachhangPageRoutingModule {}
