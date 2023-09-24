import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulelichbanPage } from './schedulelichban.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulelichbanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulelichbanPageRoutingModule {}
