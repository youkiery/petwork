import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KhachhangchinhanhPageRoutingModule } from './khachhangchinhanh-routing.module';

import { KhachhangchinhanhPage } from './khachhangchinhanh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KhachhangchinhanhPageRoutingModule
  ],
  declarations: [KhachhangchinhanhPage]
})
export class KhachhangchinhanhPageModule {}
