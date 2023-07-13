import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherPage } from './other.page';

const routes: Routes = [
  {
    path: '',
    component: OtherPage
  },
  {
    path: 'insert',
    loadChildren: () => import('./otherinsert/otherinsert.module').then( m => m.OtherinsertPageModule)
  },
  {
    path: 'type',
    loadChildren: () => import('./othertype/othertype.module').then( m => m.OthertypePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherPageRoutingModule {}
