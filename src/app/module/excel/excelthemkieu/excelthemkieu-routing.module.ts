import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelthemkieuPage } from './excelthemkieu.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelthemkieuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelthemkieuPageRoutingModule {}
