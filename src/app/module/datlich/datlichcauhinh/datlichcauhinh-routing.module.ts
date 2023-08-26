import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatlichcauhinhPage } from './datlichcauhinh.page';

const routes: Routes = [
  {
    path: '',
    component: DatlichcauhinhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatlichcauhinhPageRoutingModule {}
