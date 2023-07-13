import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VaccinePage } from './vaccine.page';

const routes: Routes = [
  {
    path: '',
    component: VaccinePage
  },
  {
    path: 'recall',
    loadChildren: () => import('./recall/recall.module').then( m => m.RecallPageModule)
  },
  {
    path: 'his',
    loadChildren: () => import('./his/his.module').then( m => m.HisPageModule)
  },
  {
    path: 'manager',
    loadChildren: () => import('./manager/manager.module').then( m => m.ManagerPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./vaccinesearch/vaccinesearch.module').then( m => m.VaccinesearchPageModule)
  },
  {
    path: 'insert',
    loadChildren: () => import('./vaccineinsert/vaccineinsert.module').then( m => m.VaccineinsertPageModule)
  },
  {
    path: 'usearch',
    loadChildren: () => import('./usgsearch/usgsearch.module').then( m => m.UsgsearchPageModule)
  },
  {
    path: 'uinsert',
    loadChildren: () => import('./usginsert/usginsert.module').then( m => m.UsginsertPageModule)
  },
  {
    path: 'd',
    loadChildren: () => import('./vaccined/vaccined.module').then( m => m.VaccinedPageModule)
  },
  {
    path: 'statis',
    loadChildren: () => import('./vaccinestatis/vaccinestatis.module').then( m => m.VaccinestatisPageModule)
  },
  {
    path: 'birth',
    loadChildren: () => import('./usgbirth/usgbirth.module').then( m => m.UsgbirthPageModule)
  },
  {
    path: 'loaitru',
    loadChildren: () => import('./vaccineloaitru/vaccineloaitru.module').then( m => m.VaccineloaitruPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccinePageRoutingModule {}
