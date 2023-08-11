import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelthemspaPage } from './excelthemspa.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelthemspaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelthemspaPageRoutingModule {}
