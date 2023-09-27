import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XetnghiemthemchitieuPageRoutingModule } from './xetnghiemthemchitieu-routing.module';

import { XetnghiemthemchitieuPage } from './xetnghiemthemchitieu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XetnghiemthemchitieuPageRoutingModule
  ],
  declarations: [XetnghiemthemchitieuPage]
})
export class XetnghiemthemchitieuPageModule {}
