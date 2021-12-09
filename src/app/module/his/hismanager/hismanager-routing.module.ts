import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HismanagerPage } from './hismanager.page';

const routes: Routes = [
  {
    path: '',
    component: HismanagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HismanagerPageRoutingModule {}
