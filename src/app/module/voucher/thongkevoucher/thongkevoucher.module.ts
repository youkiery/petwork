import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThongkevoucherPageRoutingModule } from './thongkevoucher-routing.module';

import { ThongkevoucherPage } from './thongkevoucher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThongkevoucherPageRoutingModule
  ],
  declarations: [ThongkevoucherPage]
})
export class ThongkevoucherPageModule {}
