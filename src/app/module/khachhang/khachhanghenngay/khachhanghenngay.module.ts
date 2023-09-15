import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KhachhanghenngayPageRoutingModule } from './khachhanghenngay-routing.module';

import { KhachhanghenngayPage } from './khachhanghenngay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KhachhanghenngayPageRoutingModule
  ],
  declarations: [KhachhanghenngayPage]
})
export class KhachhanghenngayPageModule {}
