import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuongnamPage } from './luongnam.page';

const routes: Routes = [
  {
    path: '',
    component: LuongnamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuongnamPageRoutingModule {}
