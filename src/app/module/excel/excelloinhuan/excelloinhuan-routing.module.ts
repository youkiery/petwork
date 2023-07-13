import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelloinhuanPage } from './excelloinhuan.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelloinhuanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelloinhuanPageRoutingModule {}
