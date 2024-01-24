import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TracnghiemdethiPage } from './tracnghiemdethi.page';

const routes: Routes = [
  {
    path: '',
    component: TracnghiemdethiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracnghiemdethiPageRoutingModule {}
