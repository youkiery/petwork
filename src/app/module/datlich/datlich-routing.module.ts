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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatlichPageRoutingModule {}
