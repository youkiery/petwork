import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkfilterPage } from './workfilter.page';

const routes: Routes = [
  {
    path: '',
    component: WorkfilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkfilterPageRoutingModule {}
