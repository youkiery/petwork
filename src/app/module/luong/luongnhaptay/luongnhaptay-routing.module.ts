import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuongnhaptayPage } from './luongnhaptay.page';

const routes: Routes = [
  {
    path: '',
    component: LuongnhaptayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuongnhaptayPageRoutingModule {}
