import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkinsertPage } from './workinsert.page';

const routes: Routes = [
  {
    path: '',
    component: WorkinsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkinsertPageRoutingModule {}
