import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelcustomerPage } from './excelcustomer.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelcustomerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelcustomerPageRoutingModule {}
