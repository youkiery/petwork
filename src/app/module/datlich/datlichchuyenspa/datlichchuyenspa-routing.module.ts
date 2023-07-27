import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatlichchuyenspaPage } from './datlichchuyenspa.page';

const routes: Routes = [
  {
    path: '',
    component: DatlichchuyenspaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatlichchuyenspaPageRoutingModule {}
