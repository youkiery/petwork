import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysinsertPage } from './physinsert.page';

const routes: Routes = [
  {
    path: '',
    component: PhysinsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysinsertPageRoutingModule {}
