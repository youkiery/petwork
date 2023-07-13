import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulethongkePage } from './schedulethongke.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulethongkePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulethongkePageRoutingModule {}
