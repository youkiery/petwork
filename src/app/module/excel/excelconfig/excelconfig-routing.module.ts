import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelconfigPage } from './excelconfig.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelconfigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelconfigPageRoutingModule {}
