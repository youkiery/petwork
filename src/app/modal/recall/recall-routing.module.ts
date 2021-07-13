import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecallPage } from './recall.page';

const routes: Routes = [
  {
    path: '',
    component: RecallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecallPageRoutingModule {}
