import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TintucchuongtrinhPage } from './tintucchuongtrinh.page';

const routes: Routes = [
  {
    path: '',
    component: TintucchuongtrinhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TintucchuongtrinhPageRoutingModule {}
