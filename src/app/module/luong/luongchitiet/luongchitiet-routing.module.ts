import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuongchitietPage } from './luongchitiet.page';

const routes: Routes = [
  {
    path: '',
    component: LuongchitietPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuongchitietPageRoutingModule {}
