import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfinsertPage } from './profinsert.page';

const routes: Routes = [
  {
    path: '',
    component: ProfinsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfinsertPageRoutingModule {}
