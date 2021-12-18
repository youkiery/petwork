import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccselectPage } from './accselect.page';

const routes: Routes = [
  {
    path: '',
    component: AccselectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccselectPageRoutingModule {}
