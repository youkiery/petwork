import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsgsearchPage } from './usgsearch.page';

const routes: Routes = [
  {
    path: '',
    component: UsgsearchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsgsearchPageRoutingModule {}
