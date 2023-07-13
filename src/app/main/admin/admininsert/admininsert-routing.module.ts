import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdmininsertPage } from './admininsert.page';

const routes: Routes = [
  {
    path: '',
    component: AdmininsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdmininsertPageRoutingModule {}
