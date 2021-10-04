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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VaccinePageRoutingModule {}
