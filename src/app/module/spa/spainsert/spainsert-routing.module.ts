import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpainsertPage } from './spainsert.page';

const routes: Routes = [
  {
    path: '',
    component: SpainsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpainsertPageRoutingModule {}
