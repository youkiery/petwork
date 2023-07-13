import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExceldangkylichPage } from './exceldangkylich.page';

const routes: Routes = [
  {
    path: '',
    component: ExceldangkylichPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExceldangkylichPageRoutingModule {}
