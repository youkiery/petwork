import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TracuuvoucherPage } from './tracuuvoucher.page';

const routes: Routes = [
  {
    path: '',
    component: TracuuvoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracuuvoucherPageRoutingModule {}
