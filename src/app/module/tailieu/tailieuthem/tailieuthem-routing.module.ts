import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TailieuthemPage } from './tailieuthem.page';

const routes: Routes = [
  {
    path: '',
    component: TailieuthemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TailieuthemPageRoutingModule {}
