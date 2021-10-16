import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartdetailPageRoutingModule } from './cartdetail-routing.module';

import { CartdetailPage } from './cartdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartdetailPageRoutingModule
  ],
  declarations: [CartdetailPage]
})
export class CartdetailPageModule {}
