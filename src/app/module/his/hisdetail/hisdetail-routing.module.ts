import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisdetailPage } from './hisdetail.page';

const routes: Routes = [
  {
    path: '',
    component: HisdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisdetailPageRoutingModule {}
