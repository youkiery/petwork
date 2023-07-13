import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HotelreturnPageRoutingModule } from './hotelreturn-routing.module';

import { HotelreturnPage } from './hotelreturn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HotelreturnPageRoutingModule
  ],
  declarations: [HotelreturnPage]
})
export class HotelreturnPageModule {}
