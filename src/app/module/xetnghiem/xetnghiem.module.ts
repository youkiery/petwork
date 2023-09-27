import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XetnghiemPageRoutingModule } from './xetnghiem-routing.module';

import { XetnghiemPage } from './xetnghiem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XetnghiemPageRoutingModule
  ],
  declarations: [XetnghiemPage]
})
export class XetnghiemPageModule {}
