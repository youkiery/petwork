import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XetnghiemchitietPageRoutingModule } from './xetnghiemchitiet-routing.module';

import { XetnghiemchitietPage } from './xetnghiemchitiet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XetnghiemchitietPageRoutingModule
  ],
  declarations: [XetnghiemchitietPage]
})
export class XetnghiemchitietPageModule {}
