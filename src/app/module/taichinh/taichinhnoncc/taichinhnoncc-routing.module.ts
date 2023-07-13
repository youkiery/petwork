import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaichinhnonccPage } from './taichinhnoncc.page';

const routes: Routes = [
  {
    path: '',
    component: TaichinhnonccPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaichinhnonccPageRoutingModule {}
