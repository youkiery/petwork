import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkdetailPage } from './workdetail.page';

const routes: Routes = [
  {
    path: '',
    component: WorkdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkdetailPageRoutingModule {}
