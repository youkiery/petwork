import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TracnghiemcapnhatPage } from './tracnghiemcapnhat.page';

const routes: Routes = [
  {
    path: '',
    component: TracnghiemcapnhatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracnghiemcapnhatPageRoutingModule {}
