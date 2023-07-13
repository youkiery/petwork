import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransportinsertPage } from './transportinsert.page';

const routes: Routes = [
  {
    path: '',
    component: TransportinsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransportinsertPageRoutingModule {}
