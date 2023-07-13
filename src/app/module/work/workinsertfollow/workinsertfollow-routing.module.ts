import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WorkinsertfollowPage } from './workinsertfollow.page';

const routes: Routes = [
  {
    path: '',
    component: WorkinsertfollowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkinsertfollowPageRoutingModule {}
