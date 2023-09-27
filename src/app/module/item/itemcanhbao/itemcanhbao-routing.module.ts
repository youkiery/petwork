import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemcanhbaoPage } from './itemcanhbao.page';

const routes: Routes = [
  {
    path: '',
    component: ItemcanhbaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemcanhbaoPageRoutingModule {}
