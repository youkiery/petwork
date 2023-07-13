import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelconfigPage } from './hotelconfig.page';

const routes: Routes = [
  {
    path: '',
    component: HotelconfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelconfigPageRoutingModule {}
