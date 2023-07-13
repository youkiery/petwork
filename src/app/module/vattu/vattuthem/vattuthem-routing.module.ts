import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VattuthemPage } from './vattuthem.page';

const routes: Routes = [
  {
    path: '',
    component: VattuthemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VattuthemPageRoutingModule {}
