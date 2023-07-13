import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaichinhimportPage } from './taichinhimport.page';

const routes: Routes = [
  {
    path: '',
    component: TaichinhimportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaichinhimportPageRoutingModule {}
