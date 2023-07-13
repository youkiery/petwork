import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelPage } from './hotel.page';

const routes: Routes = [
  {
    path: '',
    component: HotelPage
  },
  {
    path: 'insert',
    loadChildren: () => import('./hotelinsert/hotelinsert.module').then( m => m.HotelinsertPageModule)
  },
  {
    path: 'return',
    loadChildren: () => import('./hotelreturn/hotelreturn.module').then( m => m.HotelreturnPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./hotelconfig/hotelconfig.module').then( m => m.HotelconfigPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelPageRoutingModule {}
