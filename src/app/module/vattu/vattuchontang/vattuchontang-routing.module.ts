import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VattuchontangPage } from './vattuchontang.page';

const routes: Routes = [
  {
    path: '',
    component: VattuchontangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VattuchontangPageRoutingModule {}
