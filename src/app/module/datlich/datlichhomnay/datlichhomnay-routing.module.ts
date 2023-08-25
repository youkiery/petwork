import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatlichhomnayPage } from './datlichhomnay.page';

const routes: Routes = [
  {
    path: '',
    component: DatlichhomnayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatlichhomnayPageRoutingModule {}
