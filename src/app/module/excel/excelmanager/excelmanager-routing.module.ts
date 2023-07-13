import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelmanagerPage } from './excelmanager.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelmanagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelmanagerPageRoutingModule {}
