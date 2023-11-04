import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TracnghiemPage } from './tracnghiem.page';

const routes: Routes = [
  {
    path: '',
    component: TracnghiemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracnghiemPageRoutingModule {}
