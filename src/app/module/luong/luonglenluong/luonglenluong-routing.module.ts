import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LuonglenluongPage } from './luonglenluong.page';

const routes: Routes = [
  {
    path: '',
    component: LuonglenluongPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LuonglenluongPageRoutingModule {}
