import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemfilePage } from './itemfile.page';

const routes: Routes = [
  {
    path: '',
    component: ItemfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemfilePageRoutingModule {}
