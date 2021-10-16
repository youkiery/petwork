import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsgPage } from './usg.page';

const routes: Routes = [
  {
    path: '',
    component: UsgPage
  },
  {
    path: 'insert',
    loadChildren: () => import('./usginsert/usginsert.module').then( m => m.UsginsertPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./usgsearch/usgsearch.module').then( m => m.UsgsearchPageModule)
  },
  {
    path: 'manager',
    loadChildren: () => import('./usgmanager/usgmanager.module').then( m => m.UsgmanagerPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsgPageRoutingModule {}
