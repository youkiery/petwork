import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuongnhanvienPage } from './luongnhanvien.page';

const routes: Routes = [
  {
    path: '',
    component: LuongnhanvienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuongnhanvienPageRoutingModule {}
