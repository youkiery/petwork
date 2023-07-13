import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { XquanginsertPage } from './xquanginsert.page';

const routes: Routes = [
  {
    path: '',
    component: XquanginsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class XquanginsertPageRoutingModule {}
