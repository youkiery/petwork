import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkstatisticPage } from './workstatistic.page';

const routes: Routes = [
  {
    path: '',
    component: WorkstatisticPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkstatisticPageRoutingModule {}
