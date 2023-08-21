import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TintucPage } from './tintuc.page';

const routes: Routes = [
  {
    path: '',
    component: TintucPage
  },
  {
    path: 'tintucthem',
    loadChildren: () => import('./tintucthem/tintucthem.module').then( m => m.TintucthemPageModule)
  },
  {
    path: 'tintucchuongtrinh',
    loadChildren: () => import('./tintucchuongtrinh/tintucchuongtrinh.module').then( m => m.TintucchuongtrinhPageModule)
  },
  {
    path: 'tintucchinhanh',
    loadChildren: () => import('./tintucchinhanh/tintucchinhanh.module').then( m => m.TintucchinhanhPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TintucPageRoutingModule {}
