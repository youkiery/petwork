import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VattuthemcophanPage } from './vattuthemcophan.page';

const routes: Routes = [
  {
    path: '',
    component: VattuthemcophanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VattuthemcophanPageRoutingModule {}
