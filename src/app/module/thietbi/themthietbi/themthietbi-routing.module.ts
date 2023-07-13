import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemthietbiPage } from './themthietbi.page';

const routes: Routes = [
  {
    path: '',
    component: ThemthietbiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemthietbiPageRoutingModule {}
