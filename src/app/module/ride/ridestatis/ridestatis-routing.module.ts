import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RidestatisPage } from './ridestatis.page';

const routes: Routes = [
  {
    path: '',
    component: RidestatisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RidestatisPageRoutingModule {}
