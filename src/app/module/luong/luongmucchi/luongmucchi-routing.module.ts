import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuongmucchiPage } from './luongmucchi.page';

const routes: Routes = [
  {
    path: '',
    component: LuongmucchiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuongmucchiPageRoutingModule {}
