import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TailieudanhmucPage } from './tailieudanhmuc.page';

const routes: Routes = [
  {
    path: '',
    component: TailieudanhmucPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TailieudanhmucPageRoutingModule {}
