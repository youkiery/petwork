import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TracnghiemchitietPage } from './tracnghiemchitiet.page';

const routes: Routes = [
  {
    path: '',
    component: TracnghiemchitietPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracnghiemchitietPageRoutingModule {}
