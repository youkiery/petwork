import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisdinsertiseasePage } from './hisdinsertisease.page';

const routes: Routes = [
  {
    path: '',
    component: HisdinsertiseasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisdinsertiseasePageRoutingModule {}
