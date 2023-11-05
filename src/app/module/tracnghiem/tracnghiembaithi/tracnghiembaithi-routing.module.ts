import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TracnghiembaithiPage } from './tracnghiembaithi.page';

const routes: Routes = [
  {
    path: '',
    component: TracnghiembaithiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TracnghiembaithiPageRoutingModule {}
