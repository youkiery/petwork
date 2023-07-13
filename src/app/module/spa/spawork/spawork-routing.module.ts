import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpaworkPage } from './spawork.page';

const routes: Routes = [
  {
    path: '',
    component: SpaworkPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpaworkPageRoutingModule {}
