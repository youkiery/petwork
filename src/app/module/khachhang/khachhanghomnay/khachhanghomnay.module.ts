import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KhachhanghomnayPageRoutingModule } from './khachhanghomnay-routing.module';

import { KhachhanghomnayPage } from './khachhanghomnay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KhachhanghomnayPageRoutingModule
  ],
  declarations: [KhachhanghomnayPage]
})
export class KhachhanghomnayPageModule {}
