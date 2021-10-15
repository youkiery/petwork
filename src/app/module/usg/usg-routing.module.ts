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
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsgPageRoutingModule {}
