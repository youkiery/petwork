import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KhachhangthemchinhanhPageRoutingModule } from './khachhangthemchinhanh-routing.module';

import { KhachhangthemchinhanhPage } from './khachhangthemchinhanh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KhachhangthemchinhanhPageRoutingModule
  ],
  declarations: [KhachhangthemchinhanhPage]
})
export class KhachhangthemchinhanhPageModule {}
