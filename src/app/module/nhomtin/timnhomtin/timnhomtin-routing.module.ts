import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimnhomtinPage } from './timnhomtin.page';

const routes: Routes = [
  {
    path: '',
    component: TimnhomtinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimnhomtinPageRoutingModule {}
