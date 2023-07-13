import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaccineloaitruPage } from './vaccineloaitru.page';

const routes: Routes = [
  {
    path: '',
    component: VaccineloaitruPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccineloaitruPageRoutingModule {}
