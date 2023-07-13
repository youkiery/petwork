import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaccinestatisPage } from './vaccinestatis.page';

const routes: Routes = [
  {
    path: '',
    component: VaccinestatisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccinestatisPageRoutingModule {}
