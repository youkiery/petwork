import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KhachhangthongkePageRoutingModule } from './khachhangthongke-routing.module';

import { KhachhangthongkePage } from './khachhangthongke.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KhachhangthongkePageRoutingModule
  ],
  declarations: [KhachhangthongkePage]
})
export class KhachhangthongkePageModule {}
