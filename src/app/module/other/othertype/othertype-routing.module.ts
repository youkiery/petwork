import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OthertypePage } from './othertype.page';

const routes: Routes = [
  {
    path: '',
    component: OthertypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OthertypePageRoutingModule {}
