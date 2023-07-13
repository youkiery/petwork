import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoinhuantaichinhPage } from './loinhuantaichinh.page';

const routes: Routes = [
  {
    path: '',
    component: LoinhuantaichinhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoinhuantaichinhPageRoutingModule {}
