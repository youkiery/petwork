import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpabieudoPage } from './spabieudo.page';

const routes: Routes = [
  {
    path: '',
    component: SpabieudoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpabieudoPageRoutingModule {}
