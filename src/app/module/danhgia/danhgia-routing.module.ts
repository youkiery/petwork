import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DanhgiaPage } from './danhgia.page';

const routes: Routes = [
  {
    path: '',
    component: DanhgiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DanhgiaPageRoutingModule {}
