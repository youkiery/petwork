import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulechamcongPage } from './schedulechamcong.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulechamcongPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulechamcongPageRoutingModule {}
