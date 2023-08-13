import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LichbanthemPage } from './lichbanthem.page';

const routes: Routes = [
  {
    path: '',
    component: LichbanthemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LichbanthemPageRoutingModule {}
