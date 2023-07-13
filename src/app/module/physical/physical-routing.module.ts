import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysicalPage } from './physical.page';

const routes: Routes = [
  {
    path: '',
    component: PhysicalPage
  },
  {
    path: 'insert',
    loadChildren: () => import('./physinsert/physinsert.module').then( m => m.PhysinsertPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./physdetail/physdetail.module').then( m => m.PhysdetailPageModule)
  },
  {
    path: 'print',
    loadChildren: () => import('./physprint/physprint.module').then( m => m.PhysprintPageModule)
  },
  {
    path: 'statis',
    loadChildren: () => import('./physstatis/physstatis.module').then( m => m.PhysstatisPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysicalPageRoutingModule {}
