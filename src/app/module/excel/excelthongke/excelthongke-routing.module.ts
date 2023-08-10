import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelthongkePage } from './excelthongke.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelthongkePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelthongkePageRoutingModule {}
