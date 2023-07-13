import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemsourcePage } from './itemsource.page';

const routes: Routes = [
  {
    path: '',
    component: ItemsourcePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemsourcePageRoutingModule {}
