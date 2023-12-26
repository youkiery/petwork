import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongkevoucherPage } from './thongkevoucher.page';

const routes: Routes = [
  {
    path: '',
    component: ThongkevoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongkevoucherPageRoutingModule {}
