import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoinhuandoanhthuPage } from './loinhuandoanhthu.page';

const routes: Routes = [
  {
    path: '',
    component: LoinhuandoanhthuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoinhuandoanhthuPageRoutingModule {}
