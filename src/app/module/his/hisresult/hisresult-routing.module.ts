import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisresultPage } from './hisresult.page';

const routes: Routes = [
  {
    path: '',
    component: HisresultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisresultPageRoutingModule {}
