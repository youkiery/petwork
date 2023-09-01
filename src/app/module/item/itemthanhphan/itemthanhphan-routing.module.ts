import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemthanhphanPage } from './itemthanhphan.page';

const routes: Routes = [
  {
    path: '',
    component: ItemthanhphanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemthanhphanPageRoutingModule {}
