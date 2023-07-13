import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VattucophanPage } from './vattucophan.page';

const routes: Routes = [
  {
    path: '',
    component: VattucophanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VattucophanPageRoutingModule {}
