import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemPage } from './item.page';

const routes: Routes = [
  {
    path: '',
    component: ItemPage
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
