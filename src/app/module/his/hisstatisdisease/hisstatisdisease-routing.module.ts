import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisstatisdiseasePage } from './hisstatisdisease.page';

const routes: Routes = [
  {
    path: '',
    component: HisstatisdiseasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisstatisdiseasePageRoutingModule {}
