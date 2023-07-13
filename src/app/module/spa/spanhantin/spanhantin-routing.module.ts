import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpanhantinPage } from './spanhantin.page';

const routes: Routes = [
  {
    path: '',
    component: SpanhantinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpanhantinPageRoutingModule {}
