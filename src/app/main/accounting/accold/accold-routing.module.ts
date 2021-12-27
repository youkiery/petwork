import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccoldPage } from './accold.page';

const routes: Routes = [
  {
    path: '',
    component: AccoldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccoldPageRoutingModule {}
