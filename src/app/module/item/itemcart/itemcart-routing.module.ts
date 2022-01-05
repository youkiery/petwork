import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemcartPage } from './itemcart.page';

const routes: Routes = [
  {
    path: '',
    component: ItemcartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemcartPageRoutingModule {}
