import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VattuthongkePage } from './vattuthongke.page';

const routes: Routes = [
  {
    path: '',
    component: VattuthongkePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VattuthongkePageRoutingModule {}
