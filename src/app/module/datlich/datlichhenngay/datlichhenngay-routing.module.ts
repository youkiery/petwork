import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatlichhenngayPage } from './datlichhenngay.page';

const routes: Routes = [
  {
    path: '',
    component: DatlichhenngayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatlichhenngayPageRoutingModule {}
