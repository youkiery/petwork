import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RideinsertPage } from './rideinsert.page';

const routes: Routes = [
  {
    path: '',
    component: RideinsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RideinsertPageRoutingModule {}
