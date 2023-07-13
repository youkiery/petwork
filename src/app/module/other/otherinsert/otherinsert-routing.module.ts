import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherinsertPage } from './otherinsert.page';

const routes: Routes = [
  {
    path: '',
    component: OtherinsertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherinsertPageRoutingModule {}
