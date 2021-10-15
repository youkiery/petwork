import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsgmanagerPage } from './usgmanager.page';

const routes: Routes = [
  {
    path: '',
    component: UsgmanagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsgmanagerPageRoutingModule {}
