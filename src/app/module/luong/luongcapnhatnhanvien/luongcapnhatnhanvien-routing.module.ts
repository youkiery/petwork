import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuongcapnhatnhanvienPage } from './luongcapnhatnhanvien.page';

const routes: Routes = [
  {
    path: '',
    component: LuongcapnhatnhanvienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuongcapnhatnhanvienPageRoutingModule {}
