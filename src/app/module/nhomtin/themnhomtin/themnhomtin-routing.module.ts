import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemnhomtinPage } from './themnhomtin.page';

const routes: Routes = [
  {
    path: '',
    component: ThemnhomtinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemnhomtinPageRoutingModule {}
