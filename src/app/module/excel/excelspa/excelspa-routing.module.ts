import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExcelspaPage } from './excelspa.page';

const routes: Routes = [
  {
    path: '',
    component: ExcelspaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExcelspaPageRoutingModule {}
