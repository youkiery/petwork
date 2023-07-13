import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpanearPage } from './spanear.page';

const routes: Routes = [
  {
    path: '',
    component: SpanearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpanearPageRoutingModule {}
