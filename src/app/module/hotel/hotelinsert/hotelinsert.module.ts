import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HotelinsertPageRoutingModule } from './hotelinsert-routing.module';

import { HotelinsertPage } from './hotelinsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HotelinsertPageRoutingModule
  ],
  declarations: [HotelinsertPage]
})
export class HotelinsertPageModule {}
