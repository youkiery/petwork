import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpathemlichbanPage } from './spathemlichban.page';

const routes: Routes = [
  {
    path: '',
    component: SpathemlichbanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpathemlichbanPageRoutingModule {}
