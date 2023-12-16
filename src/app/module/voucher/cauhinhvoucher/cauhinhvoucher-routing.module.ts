import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CauhinhvoucherPage } from './cauhinhvoucher.page';

const routes: Routes = [
  {
    path: '',
    component: CauhinhvoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CauhinhvoucherPageRoutingModule {}
