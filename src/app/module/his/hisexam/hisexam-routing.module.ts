import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisexamPage } from './hisexam.page';

const routes: Routes = [
  {
    path: '',
    component: HisexamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisexamPageRoutingModule {}
