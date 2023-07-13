import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfdetailPage } from './profdetail.page';

const routes: Routes = [
  {
    path: '',
    component: ProfdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfdetailPageRoutingModule {}
