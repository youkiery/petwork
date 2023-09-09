import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TailieuPage } from './tailieu.page';

const routes: Routes = [
  {
    path: '',
    component: TailieuPage
  },
  {
    path: 'tailieudanhmuc',
    loadChildren: () => import('./tailieudanhmuc/tailieudanhmuc.module').then( m => m.TailieudanhmucPageModule)
  },
  {
    path: 'tailieuthem',
    loadChildren: () => import('./tailieuthem/tailieuthem.module').then( m => m.TailieuthemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TailieuPageRoutingModule {}
