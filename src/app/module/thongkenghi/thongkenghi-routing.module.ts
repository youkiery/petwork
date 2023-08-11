import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongkenghiPage } from './thongkenghi.page';

const routes: Routes = [
  {
    path: '',
    component: ThongkenghiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongkenghiPageRoutingModule {}
