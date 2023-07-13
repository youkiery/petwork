import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpathongkePage } from './spathongke.page';

const routes: Routes = [
  {
    path: '',
    component: SpathongkePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpathongkePageRoutingModule {}
