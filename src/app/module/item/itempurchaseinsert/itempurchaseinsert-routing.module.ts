import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItempurchaseinsertPage } from './itempurchaseinsert.page';

const routes: Routes = [
  {
    path: '',
    component: ItempurchaseinsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItempurchaseinsertPageRoutingModule {}
