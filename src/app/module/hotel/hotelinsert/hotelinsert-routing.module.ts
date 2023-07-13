import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelinsertPage } from './hotelinsert.page';

const routes: Routes = [
  {
    path: '',
    component: HotelinsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelinsertPageRoutingModule {}
