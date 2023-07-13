import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaccineinsertPage } from './vaccineinsert.page';

const routes: Routes = [
  {
    path: '',
    component: VaccineinsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccineinsertPageRoutingModule {}
