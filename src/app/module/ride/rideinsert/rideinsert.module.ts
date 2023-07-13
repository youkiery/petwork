import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RideinsertPageRoutingModule } from './rideinsert-routing.module';

import { RideinsertPage } from './rideinsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RideinsertPageRoutingModule
  ],
  declarations: [RideinsertPage]
})
export class RideinsertPageModule {}
