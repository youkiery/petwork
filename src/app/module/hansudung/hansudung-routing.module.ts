import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HansudungPage } from './hansudung.page';

const routes: Routes = [
  {
    path: '',
    component: HansudungPage
  },
  {
    path: 'them',
    loadChildren: () => import('./hansudungthem/hansudungthem.module').then( m => m.HansudungthemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HansudungPageRoutingModule {}
