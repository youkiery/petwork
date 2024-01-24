import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TracnghiemcapnhatdethiPage } from './tracnghiemcapnhatdethi.page';

const routes: Routes = [
  {
    path: '',
    component: TracnghiemcapnhatdethiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracnghiemcapnhatdethiPageRoutingModule {}
