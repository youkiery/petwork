import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemvoucherPage } from './themvoucher.page';

const routes: Routes = [
  {
    path: '',
    component: ThemvoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemvoucherPageRoutingModule {}
