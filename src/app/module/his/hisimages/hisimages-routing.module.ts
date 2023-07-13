import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisimagesPage } from './hisimages.page';

const routes: Routes = [
  {
    path: '',
    component: HisimagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisimagesPageRoutingModule {}
