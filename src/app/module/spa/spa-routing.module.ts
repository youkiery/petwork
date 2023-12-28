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
  },
  {
    path: 'schedule',
    loadChildren: () => import('./spaschedule/spaschedule.module').then( m => m.SpaschedulePageModule)
  },
  {
    path: 'near',
    loadChildren: () => import('./spanear/spanear.module').then( m => m.SpanearPageModule)
  },
  {
    path: 'insert',
    loadChildren: () => import('./spainsert/spainsert.module').then( m => m.SpainsertPageModule)
  },
  {
    path: 'congviec',
    loadChildren: () => import('./spawork/spawork.module').then( m => m.SpaworkPageModule)
  },
  {
    path: 'detail',
    loadChildren: () => import('./spadetail/spadetail.module').then( m => m.SpadetailPageModule)
  },
  {
    path: 'thongke',
    loadChildren: () => import('./spathongke/spathongke.module').then( m => m.SpathongkePageModule)
  },
  {
    path: 'chitietthongke',
    loadChildren: () => import('./spachitietthongke/spachitietthongke.module').then( m => m.SpachitietthongkePageModule)
  },
  {
    path: 'nhantin',
    loadChildren: () => import('./spanhantin/spanhantin.module').then( m => m.SpanhantinPageModule)
  },
  {
    path: 'danhsachnhantin',
    loadChildren: () => import('./spadanhsachnhantin/spadanhsachnhantin.module').then( m => m.SpadanhsachnhantinPageModule)
  },
  {
    path: 'bieudo',
    loadChildren: () => import('./spabieudo/spabieudo.module').then( m => m.SpabieudoPageModule)
  },
  {
    path: 'lichban',
    loadChildren: () => import('./spalichban/spalichban.module').then( m => m.SpalichbanPageModule)
  },
  {
    path: 'themlichban',
    loadChildren: () => import('./spathemlichban/spathemlichban.module').then( m => m.SpathemlichbanPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaPageRoutingModule {}
