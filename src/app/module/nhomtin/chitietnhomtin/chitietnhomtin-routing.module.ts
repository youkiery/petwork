import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChitietnhomtinPage } from './chitietnhomtin.page';

const routes: Routes = [
  {
    path: '',
    component: ChitietnhomtinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChitietnhomtinPageRoutingModule {}
