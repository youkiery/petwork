import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportPage } from './transport.page';

const routes: Routes = [
  {
    path: '',
    component: TransportPage
  },
  {
    path: 'insert',
    loadChildren: () => import('./transportinsert/transportinsert.module').then( m => m.TransportinsertPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportPageRoutingModule {}
