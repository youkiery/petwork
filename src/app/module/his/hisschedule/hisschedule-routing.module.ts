import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisschedulePage } from './hisschedule.page';

const routes: Routes = [
  {
    path: '',
    component: HisschedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisschedulePageRoutingModule {}
