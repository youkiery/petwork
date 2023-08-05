import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChuyenmonPage } from './chuyenmon.page';

const routes: Routes = [
  {
    path: '',
    component: ChuyenmonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChuyenmonPageRoutingModule {}
