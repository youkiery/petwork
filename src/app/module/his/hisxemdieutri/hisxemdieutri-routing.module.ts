import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HisxemdieutriPage } from './hisxemdieutri.page';

const routes: Routes = [
  {
    path: '',
    component: HisxemdieutriPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HisxemdieutriPageRoutingModule {}
