import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpaPage } from './spa.page';

const routes: Routes = [
  {
    path: '',
    component: SpaPage
  },
  {
    path: 'done',
    loadChildren: () => import('./done/done.module').then( m => m.DonePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaPageRoutingModule {}
