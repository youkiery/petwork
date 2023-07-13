import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpaschedulePage } from './spaschedule.page';

const routes: Routes = [
  {
    path: '',
    component: SpaschedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaschedulePageRoutingModule {}
