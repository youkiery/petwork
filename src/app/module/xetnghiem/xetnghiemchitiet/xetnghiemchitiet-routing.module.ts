import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XetnghiemchitietPage } from './xetnghiemchitiet.page';

const routes: Routes = [
  {
    path: '',
    component: XetnghiemchitietPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XetnghiemchitietPageRoutingModule {}
