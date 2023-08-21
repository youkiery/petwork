import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TintucchinhanhPage } from './tintucchinhanh.page';

const routes: Routes = [
  {
    path: '',
    component: TintucchinhanhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TintucchinhanhPageRoutingModule {}
