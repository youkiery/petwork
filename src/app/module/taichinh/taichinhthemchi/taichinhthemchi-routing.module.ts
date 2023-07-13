import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaichinhthemchiPage } from './taichinhthemchi.page';

const routes: Routes = [
  {
    path: '',
    component: TaichinhthemchiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaichinhthemchiPageRoutingModule {}
