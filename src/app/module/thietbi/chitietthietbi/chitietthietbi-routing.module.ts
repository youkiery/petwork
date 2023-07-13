import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChitietthietbiPage } from './chitietthietbi.page';

const routes: Routes = [
  {
    path: '',
    component: ChitietthietbiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChitietthietbiPageRoutingModule {}
