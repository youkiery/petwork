import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemimportPage } from './itemimport.page';

const routes: Routes = [
  {
    path: '',
    component: ItemimportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemimportPageRoutingModule {}
