import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuongsosanhPage } from './luongsosanh.page';

const routes: Routes = [
  {
    path: '',
    component: LuongsosanhPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuongsosanhPageRoutingModule {}
