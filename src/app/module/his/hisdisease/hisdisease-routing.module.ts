import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisdiseasePage } from './hisdisease.page';

const routes: Routes = [
  {
    path: '',
    component: HisdiseasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisdiseasePageRoutingModule {}
