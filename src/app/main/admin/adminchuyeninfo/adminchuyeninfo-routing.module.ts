import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminchuyeninfoPage } from './adminchuyeninfo.page';

const routes: Routes = [
  {
    path: '',
    component: AdminchuyeninfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminchuyeninfoPageRoutingModule {}
