import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoinhuancauhinhPage } from './loinhuancauhinh.page';

const routes: Routes = [
  {
    path: '',
    component: LoinhuancauhinhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoinhuancauhinhPageRoutingModule {}
