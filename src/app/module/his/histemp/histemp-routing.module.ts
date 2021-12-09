import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistempPage } from './histemp.page';

const routes: Routes = [
  {
    path: '',
    component: HistempPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistempPageRoutingModule {}
