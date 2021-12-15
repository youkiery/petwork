import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItempurchasePage } from './itempurchase.page';

const routes: Routes = [
  {
    path: '',
    component: ItempurchasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItempurchasePageRoutingModule {}
