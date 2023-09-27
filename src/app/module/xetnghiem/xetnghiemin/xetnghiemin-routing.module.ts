import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XetnghieminPage } from './xetnghiemin.page';

const routes: Routes = [
  {
    path: '',
    component: XetnghieminPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XetnghieminPageRoutingModule {}
