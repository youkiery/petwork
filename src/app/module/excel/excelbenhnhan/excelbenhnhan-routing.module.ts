import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelbenhnhanPage } from './excelbenhnhan.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelbenhnhanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelbenhnhanPageRoutingModule {}
