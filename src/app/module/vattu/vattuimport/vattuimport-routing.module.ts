import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VattuimportPage } from './vattuimport.page';

const routes: Routes = [
  {
    path: '',
    component: VattuimportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VattuimportPageRoutingModule {}
