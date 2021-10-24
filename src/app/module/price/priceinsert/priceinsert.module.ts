import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriceinsertPageRoutingModule } from './priceinsert-routing.module';

import { PriceinsertPage } from './priceinsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PriceinsertPageRoutingModule
  ],
  declarations: [PriceinsertPage]
})
export class PriceinsertPageModule {}
