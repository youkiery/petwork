import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WorkdetailPageRoutingModule } from './workdetail-routing.module';

import { WorkdetailPage } from './workdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WorkdetailPageRoutingModule
  ],
  declarations: [WorkdetailPage]
})
export class WorkdetailPageModule {}
