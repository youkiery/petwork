import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HotelconfigPageRoutingModule } from './hotelconfig-routing.module';

import { HotelconfigPage } from './hotelconfig.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HotelconfigPageRoutingModule
  ],
  declarations: [HotelconfigPage]
})
export class HotelconfigPageModule {}
