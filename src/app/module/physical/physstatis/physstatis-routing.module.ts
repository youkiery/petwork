import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysstatisPage } from './physstatis.page';

const routes: Routes = [
  {
    path: '',
    component: PhysstatisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysstatisPageRoutingModule {}
