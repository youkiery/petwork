import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemmanagerPage } from './itemmanager.page';

const routes: Routes = [
  {
    path: '',
    component: ItemmanagerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemmanagerPageRoutingModule {}
