import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkdepartPage } from './workdepart.page';

const routes: Routes = [
  {
    path: '',
    component: WorkdepartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkdepartPageRoutingModule {}
