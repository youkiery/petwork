import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminaddPage } from './adminadd.page';

const routes: Routes = [
  {
    path: '',
    component: AdminaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminaddPageRoutingModule {}
