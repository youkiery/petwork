import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelhotelPage } from './excelhotel.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelhotelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelhotelPageRoutingModule {}
