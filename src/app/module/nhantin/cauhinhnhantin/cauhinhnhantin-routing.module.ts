import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CauhinhnhantinPage } from './cauhinhnhantin.page';

const routes: Routes = [
  {
    path: '',
    component: CauhinhnhantinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CauhinhnhantinPageRoutingModule {}
