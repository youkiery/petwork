import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TracnghiemketquaPage } from './tracnghiemketqua.page';

const routes: Routes = [
  {
    path: '',
    component: TracnghiemketquaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracnghiemketquaPageRoutingModule {}
