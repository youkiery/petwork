import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatlichPage } from './datlich.page';

const routes: Routes = [
  {
    path: '',
    component: DatlichPage
  },
  {
    path: 'henngay',
    loadChildren: () => import('./datlichhenngay/datlichhenngay.module').then( m => m.DatlichhenngayPageModule)
  },
  {
    path: 'chuyenspa',
    loadChildren: () => import('./datlichchuyenspa/datlichchuyenspa.module').then( m => m.DatlichchuyenspaPageModule)
  },
  {
    path: 'tonghop',
    loadChildren: () => import('./datlichtonghop/datlichtonghop.module').then( m => m.DatlichtonghopPageModule)
  },
  {
    path: 'chuyenmon',
    loadChildren: () => import('./datlichchuyenmon/datlichchuyenmon.module').then( m => m.DatlichchuyenmonPageModule)
  },
  {
    path: 'datlichhomnay',
    loadChildren: () => import('./datlichhomnay/datlichhomnay.module').then( m => m.DatlichhomnayPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatlichPageRoutingModule {}
