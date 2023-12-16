import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CauhinhvoucherPageRoutingModule } from './cauhinhvoucher-routing.module';

import { CauhinhvoucherPage } from './cauhinhvoucher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CauhinhvoucherPageRoutingModule
  ],
  declarations: [CauhinhvoucherPage]
})
export class CauhinhvoucherPageModule {}
