import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PricePage } from './price.page';

const routes: Routes = [
  {
    path: '',
    component: PricePage
  },
  {
    path: 'insert',
    loadChildren: () => import('./priceinsert/priceinsert.module').then( m => m.PriceinsertPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PricePageRoutingModule {}
