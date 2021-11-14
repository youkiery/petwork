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
  {
    path: 'statis',
    loadChildren: () => import('./ridestatis/ridestatis.module').then( m => m.RidestatisPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidePageRoutingModule {}
