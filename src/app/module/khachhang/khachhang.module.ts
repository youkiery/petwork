import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KhachhangPageRoutingModule } from './khachhang-routing.module';

import { KhachhangPage } from './khachhang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KhachhangPageRoutingModule
  ],
  declarations: [KhachhangPage]
})
export class KhachhangPageModule {}
