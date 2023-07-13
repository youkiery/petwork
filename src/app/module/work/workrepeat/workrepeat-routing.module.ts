import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkrepeatPage } from './workrepeat.page';

const routes: Routes = [
  {
    path: '',
    component: WorkrepeatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkrepeatPageRoutingModule {}
