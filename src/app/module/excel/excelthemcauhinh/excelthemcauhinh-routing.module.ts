import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelthemcauhinhPage } from './excelthemcauhinh.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelthemcauhinhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelthemcauhinhPageRoutingModule {}
