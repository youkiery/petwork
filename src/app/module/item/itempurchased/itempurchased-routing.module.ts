import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItempurchasedPage } from './itempurchased.page';

const routes: Routes = [
  {
    path: '',
    component: ItempurchasedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItempurchasedPageRoutingModule {}
