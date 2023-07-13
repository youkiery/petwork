import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelloaivaccinePage } from './excelloaivaccine.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelloaivaccinePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelloaivaccinePageRoutingModule {}
