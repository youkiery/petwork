import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SchedulecauhinhchamcongPage } from './schedulecauhinhchamcong.page';

const routes: Routes = [
  {
    path: '',
    component: SchedulecauhinhchamcongPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchedulecauhinhchamcongPageRoutingModule {}
