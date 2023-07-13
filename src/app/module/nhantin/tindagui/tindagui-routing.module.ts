import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TindaguiPage } from './tindagui.page';

const routes: Routes = [
  {
    path: '',
    component: TindaguiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TindaguiPageRoutingModule {}
