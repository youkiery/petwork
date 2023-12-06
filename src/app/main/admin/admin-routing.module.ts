import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage
  },
  {
    path: 'add',
    loadChildren: () => import('./adminadd/adminadd.module').then( m => m.AdminaddPageModule)
  },
  {
    path: 'insert',
    loadChildren: () => import('./admininsert/admininsert.module').then( m => m.AdmininsertPageModule)
  },
  {
    path: 'place',
    loadChildren: () => import('./adminplace/adminplace.module').then( m => m.AdminplacePageModule)
  },
  {
    path: 'chuyeninfo',
    loadChildren: () => import('./adminchuyeninfo/adminchuyeninfo.module').then( m => m.AdminchuyeninfoPageModule)
  },
  {
    path: 'zalo',
    loadChildren: () => import('./adminzalo/adminzalo.module').then( m => m.AdminzaloPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
