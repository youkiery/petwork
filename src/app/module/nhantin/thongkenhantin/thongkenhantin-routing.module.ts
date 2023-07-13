import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThongkenhantinPage } from './thongkenhantin.page';

const routes: Routes = [
  {
    path: '',
    component: ThongkenhantinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThongkenhantinPageRoutingModule {}
