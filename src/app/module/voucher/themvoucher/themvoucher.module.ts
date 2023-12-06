import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThemvoucherPageRoutingModule } from './themvoucher-routing.module';

import { ThemvoucherPage } from './themvoucher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThemvoucherPageRoutingModule
  ],
  declarations: [ThemvoucherPage]
})
export class ThemvoucherPageModule {}
