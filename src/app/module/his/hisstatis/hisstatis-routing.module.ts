import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisstatisPage } from './hisstatis.page';

const routes: Routes = [
  {
    path: '',
    component: HisstatisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisstatisPageRoutingModule {}
