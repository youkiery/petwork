import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManualinsertPage } from './manualinsert.page';

const routes: Routes = [
  {
    path: '',
    component: ManualinsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualinsertPageRoutingModule {}
