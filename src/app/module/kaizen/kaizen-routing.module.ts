import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KaizenPage } from './kaizen.page';

const routes: Routes = [
  {
    path: '',
    component: KaizenPage
  },
  {
    path: 'insert',
    loadChildren: () => import('./kaizeninsert/kaizeninsert.module').then( m => m.KaizeninsertPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KaizenPageRoutingModule {}
