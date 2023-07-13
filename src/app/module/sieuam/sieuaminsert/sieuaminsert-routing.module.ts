import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SieuaminsertPage } from './sieuaminsert.page';

const routes: Routes = [
  {
    path: '',
    component: SieuaminsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SieuaminsertPageRoutingModule {}
