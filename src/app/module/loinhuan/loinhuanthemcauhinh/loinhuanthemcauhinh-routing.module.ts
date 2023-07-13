import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoinhuanthemcauhinhPage } from './loinhuanthemcauhinh.page';

const routes: Routes = [
  {
    path: '',
    component: LoinhuanthemcauhinhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoinhuanthemcauhinhPageRoutingModule {}
