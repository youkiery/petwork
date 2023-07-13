import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Hisstatistic2Page } from './hisstatistic2.page';

const routes: Routes = [
  {
    path: '',
    component: Hisstatistic2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Hisstatistic2PageRoutingModule {}
