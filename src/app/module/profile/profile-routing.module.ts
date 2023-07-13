import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'detail',
    loadChildren: () => import('./profdetail/profdetail.module').then( m => m.ProfdetailPageModule)
  },
  {
    path: 'print',
    loadChildren: () => import('./profprint/profprint.module').then( m => m.ProfprintPageModule)
  },
  {
    path: 'insert',
    loadChildren: () => import('./profinsert/profinsert.module').then( m => m.ProfinsertPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
