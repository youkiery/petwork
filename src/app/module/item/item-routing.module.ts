import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemPage } from './item.page';

const routes: Routes = [
  {
    path: '',
    component: ItemPage
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/item.module').then( m => m.ItemPageModule)
  },
  {
    path: 'manager',
    loadChildren: () => import('./itemmanager/itemmanager.module').then( m => m.ItemmanagerPageModule)
  },
  {
    path: 'purchase',
    loadChildren: () => import('./itempurchase/itempurchase.module').then( m => m.ItempurchasePageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemPageRoutingModule {}
