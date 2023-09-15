import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KhachhangdanhgiaPageRoutingModule } from './khachhangdanhgia-routing.module';

import { KhachhangdanhgiaPage } from './khachhangdanhgia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KhachhangdanhgiaPageRoutingModule
  ],
  declarations: [KhachhangdanhgiaPage]
})
export class KhachhangdanhgiaPageModule {}
