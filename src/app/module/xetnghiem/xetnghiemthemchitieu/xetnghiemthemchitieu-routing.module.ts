import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XetnghiemthemchitieuPage } from './xetnghiemthemchitieu.page';

const routes: Routes = [
  {
    path: '',
    component: XetnghiemthemchitieuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XetnghiemthemchitieuPageRoutingModule {}
