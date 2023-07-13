import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysdetailPage } from './physdetail.page';

const routes: Routes = [
  {
    path: '',
    component: PhysdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysdetailPageRoutingModule {}
