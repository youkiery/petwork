import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThemcauhinhPage } from './themcauhinh.page';

const routes: Routes = [
  {
    path: '',
    component: ThemcauhinhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThemcauhinhPageRoutingModule {}
