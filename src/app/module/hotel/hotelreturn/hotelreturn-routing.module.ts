import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelreturnPage } from './hotelreturn.page';

const routes: Routes = [
  {
    path: '',
    component: HotelreturnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelreturnPageRoutingModule {}
