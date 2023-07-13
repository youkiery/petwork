import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpadanhsachnhantinPage } from './spadanhsachnhantin.page';

const routes: Routes = [
  {
    path: '',
    component: SpadanhsachnhantinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpadanhsachnhantinPageRoutingModule {}
