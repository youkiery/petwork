import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemfinalPage } from './itemfinal.page';

const routes: Routes = [
  {
    path: '',
    component: ItemfinalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemfinalPageRoutingModule {}
