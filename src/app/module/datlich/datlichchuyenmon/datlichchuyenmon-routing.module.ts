import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatlichchuyenmonPage } from './datlichchuyenmon.page';

const routes: Routes = [
  {
    path: '',
    component: DatlichchuyenmonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatlichchuyenmonPageRoutingModule {}
