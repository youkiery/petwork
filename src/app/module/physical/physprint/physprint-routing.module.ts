import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhysprintPage } from './physprint.page';

const routes: Routes = [
  {
    path: '',
    component: PhysprintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhysprintPageRoutingModule {}
