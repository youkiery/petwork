import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpalichbanPage } from './spalichban.page';

const routes: Routes = [
  {
    path: '',
    component: SpalichbanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpalichbanPageRoutingModule {}
