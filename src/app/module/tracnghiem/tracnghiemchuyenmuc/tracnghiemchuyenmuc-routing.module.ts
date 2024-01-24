import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TracnghiemchuyenmucPage } from './tracnghiemchuyenmuc.page';

const routes: Routes = [
  {
    path: '',
    component: TracnghiemchuyenmucPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracnghiemchuyenmucPageRoutingModule {}
