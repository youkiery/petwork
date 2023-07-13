import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualdetailPage } from './manualdetail.page';

const routes: Routes = [
  {
    path: '',
    component: ManualdetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualdetailPageRoutingModule {}
