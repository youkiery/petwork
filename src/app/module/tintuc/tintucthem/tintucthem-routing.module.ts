import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TintucthemPage } from './tintucthem.page';

const routes: Routes = [
  {
    path: '',
    component: TintucthemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TintucthemPageRoutingModule {}
