import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkdepartinsertPage } from './workdepartinsert.page';

const routes: Routes = [
  {
    path: '',
    component: WorkdepartinsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkdepartinsertPageRoutingModule {}
