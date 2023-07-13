import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelconfigformPage } from './excelconfigform.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelconfigformPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelconfigformPageRoutingModule {}
