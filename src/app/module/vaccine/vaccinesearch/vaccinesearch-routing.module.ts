import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaccinesearchPage } from './vaccinesearch.page';

const routes: Routes = [
  {
    path: '',
    component: VaccinesearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccinesearchPageRoutingModule {}
