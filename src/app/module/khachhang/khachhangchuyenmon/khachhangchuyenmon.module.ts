import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KhachhangchuyenmonPageRoutingModule } from './khachhangchuyenmon-routing.module';

import { KhachhangchuyenmonPage } from './khachhangchuyenmon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KhachhangchuyenmonPageRoutingModule
  ],
  declarations: [KhachhangchuyenmonPage]
})
export class KhachhangchuyenmonPageModule {}
