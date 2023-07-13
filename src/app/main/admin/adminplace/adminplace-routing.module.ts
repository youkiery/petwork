import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminplacePage } from './adminplace.page';

const routes: Routes = [
  {
    path: '',
    component: AdminplacePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminplacePageRoutingModule {}
