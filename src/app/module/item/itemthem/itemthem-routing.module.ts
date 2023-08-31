import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemthemPage } from './itemthem.page';

const routes: Routes = [
  {
    path: '',
    component: ItemthemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemthemPageRoutingModule {}
