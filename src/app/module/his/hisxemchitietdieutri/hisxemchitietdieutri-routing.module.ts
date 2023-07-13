import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisxemchitietdieutriPage } from './hisxemchitietdieutri.page';

const routes: Routes = [
  {
    path: '',
    component: HisxemchitietdieutriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisxemchitietdieutriPageRoutingModule {}
