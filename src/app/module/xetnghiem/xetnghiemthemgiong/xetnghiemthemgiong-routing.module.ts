import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XetnghiemthemgiongPage } from './xetnghiemthemgiong.page';

const routes: Routes = [
  {
    path: '',
    component: XetnghiemthemgiongPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XetnghiemthemgiongPageRoutingModule {}
