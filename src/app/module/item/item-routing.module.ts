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
  {
    path: 'pos',
    loadChildren: () => import('./itempos/itempos.module').then( m => m.ItemposPageModule)
  },
  {
    path: 'purchaseinsert',
    loadChildren: () => import('./itempurchaseinsert/itempurchaseinsert.module').then( m => m.ItempurchaseinsertPageModule)
  },
  {
    path: 'source',
    loadChildren: () => import('./itemsource/itemsource.module').then( m => m.ItemsourcePageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./itemcart/itemcart.module').then( m => m.ItemcartPageModule)
  },
  {
    path: 'transfer',
    loadChildren: () => import('./itemtransfer/itemtransfer.module').then( m => m.ItemtransferPageModule)
  },
  {
    path: 'final',
    loadChildren: () => import('./itemfinal/itemfinal.module').then( m => m.ItemfinalPageModule)
  },
  {
    path: 'purchased',
    loadChildren: () => import('./itempurchased/itempurchased.module').then( m => m.ItempurchasedPageModule)
  },
  {
    path: 'them',
    loadChildren: () => import('./itemthem/itemthem.module').then( m => m.ItemthemPageModule)
  },
  {
    path: 'import',
    loadChildren: () => import('./itemimport/itemimport.module').then( m => m.ItemimportPageModule)
  },
  {
    path: 'file',
    loadChildren: () => import('./itemfile/itemfile.module').then( m => m.ItemfilePageModule)
  },
  {
    path: 'thanhphan',
    loadChildren: () => import('./itemthanhphan/itemthanhphan.module').then( m => m.ItemthanhphanPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemPageRoutingModule {}
