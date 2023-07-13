import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuongthangPage } from './luongthang.page';

const routes: Routes = [
  {
    path: '',
    component: LuongthangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuongthangPageRoutingModule {}
