import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KaizeninsertPage } from './kaizeninsert.page';

const routes: Routes = [
  {
    path: '',
    component: KaizeninsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KaizeninsertPageRoutingModule {}
