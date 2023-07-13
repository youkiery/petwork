import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaccinedPage } from './vaccined.page';

const routes: Routes = [
  {
    path: '',
    component: VaccinedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccinedPageRoutingModule {}
