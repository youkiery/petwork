import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InoutPage } from './inout.page';

const routes: Routes = [
  {
    path: '',
    component: InoutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InoutPageRoutingModule {}
