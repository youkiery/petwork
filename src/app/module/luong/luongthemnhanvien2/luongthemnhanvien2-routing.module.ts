import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Luongthemnhanvien2Page } from './luongthemnhanvien2.page';

const routes: Routes = [
  {
    path: '',
    component: Luongthemnhanvien2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Luongthemnhanvien2PageRoutingModule {}
