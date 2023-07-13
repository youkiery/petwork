import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsgbirthPage } from './usgbirth.page';

const routes: Routes = [
  {
    path: '',
    component: UsgbirthPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsgbirthPageRoutingModule {}
