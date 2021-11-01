import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RidePage } from './ride.page';

const routes: Routes = [
  {
    path: '',
    component: RidePage
  },
  {
    path: 'insert',
    loadChildren: () => import('./rideinsert/rideinsert.module').then( m => m.RideinsertPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidePageRoutingModule {}
