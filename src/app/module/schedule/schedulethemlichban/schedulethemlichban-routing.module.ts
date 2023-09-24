import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulethemlichbanPage } from './schedulethemlichban.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulethemlichbanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulethemlichbanPageRoutingModule {}
