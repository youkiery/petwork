import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemposPage } from './itempos.page';

const routes: Routes = [
  {
    path: '',
    component: ItemposPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemposPageRoutingModule {}
