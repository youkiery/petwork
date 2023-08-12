import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongkenghicauhinhPage } from './thongkenghicauhinh.page';

const routes: Routes = [
  {
    path: '',
    component: ThongkenghicauhinhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongkenghicauhinhPageRoutingModule {}
