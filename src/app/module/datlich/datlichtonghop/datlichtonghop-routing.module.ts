import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatlichtonghopPage } from './datlichtonghop.page';

const routes: Routes = [
  {
    path: '',
    component: DatlichtonghopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatlichtonghopPageRoutingModule {}
