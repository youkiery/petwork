import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaichinhPage } from './taichinh.page';

const routes: Routes = [
  {
    path: '',
    component: TaichinhPage
  },
  {
    path: 'them',
    loadChildren: () => import('./taichinhthem/taichinhthem.module').then( m => m.TaichinhthemPageModule)
  },
  {
    path: 'themchi',
    loadChildren: () => import('./taichinhthemchi/taichinhthemchi.module').then( m => m.TaichinhthemchiPageModule)
  },
  {
    path: 'noncc',
    loadChildren: () => import('./taichinhnoncc/taichinhnoncc.module').then( m => m.TaichinhnonccPageModule)
  },
  {
    path: 'import',
    loadChildren: () => import('./taichinhimport/taichinhimport.module').then( m => m.TaichinhimportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaichinhPageRoutingModule {}
