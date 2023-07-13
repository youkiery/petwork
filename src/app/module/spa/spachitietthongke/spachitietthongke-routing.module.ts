import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpachitietthongkePage } from './spachitietthongke.page';

const routes: Routes = [
  {
    path: '',
    component: SpachitietthongkePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpachitietthongkePageRoutingModule {}
