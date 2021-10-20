import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisinsertPage } from './hisinsert.page';

const routes: Routes = [
  {
    path: '',
    component: HisinsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisinsertPageRoutingModule {}
