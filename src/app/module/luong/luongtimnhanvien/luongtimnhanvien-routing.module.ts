import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuongtimnhanvienPage } from './luongtimnhanvien.page';

const routes: Routes = [
  {
    path: '',
    component: LuongtimnhanvienPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuongtimnhanvienPageRoutingModule {}
