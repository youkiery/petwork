import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountingPage } from './accounting.page';

const routes: Routes = [
  {
    path: '',
    component: AccountingPage
  },
  {
    path: 'select',
    loadChildren: () => import('./accselect/accselect.module').then( m => m.AccselectPageModule)
  },
  {
    path: 'old',
    loadChildren: () => import('./accold/accold.module').then( m => m.AccoldPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountingPageRoutingModule {}
