import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisprintPage } from './hisprint.page';

const routes: Routes = [
  {
    path: '',
    component: HisprintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisprintPageRoutingModule {}
