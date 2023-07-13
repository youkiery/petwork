import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoinhuannhapPage } from './loinhuannhap.page';

const routes: Routes = [
  {
    path: '',
    component: LoinhuannhapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoinhuannhapPageRoutingModule {}
