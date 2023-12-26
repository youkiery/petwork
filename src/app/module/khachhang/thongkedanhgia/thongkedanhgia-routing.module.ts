import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongkedanhgiaPage } from './thongkedanhgia.page';

const routes: Routes = [
  {
    path: '',
    component: ThongkedanhgiaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongkedanhgiaPageRoutingModule {}
