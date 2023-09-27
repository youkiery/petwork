import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XetnghiemthemPage } from './xetnghiemthem.page';

const routes: Routes = [
  {
    path: '',
    component: XetnghiemthemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XetnghiemthemPageRoutingModule {}
