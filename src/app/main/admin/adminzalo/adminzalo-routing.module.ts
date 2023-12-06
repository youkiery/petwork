import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminzaloPage } from './adminzalo.page';

const routes: Routes = [
  {
    path: '',
    component: AdminzaloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminzaloPageRoutingModule {}
