import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemtransferPage } from './itemtransfer.page';

const routes: Routes = [
  {
    path: '',
    component: ItemtransferPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemtransferPageRoutingModule {}
