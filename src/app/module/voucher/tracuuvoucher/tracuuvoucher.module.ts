import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TracuuvoucherPageRoutingModule } from './tracuuvoucher-routing.module';

import { TracuuvoucherPage } from './tracuuvoucher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TracuuvoucherPageRoutingModule
  ],
  declarations: [TracuuvoucherPage]
})
export class TracuuvoucherPageModule {}
