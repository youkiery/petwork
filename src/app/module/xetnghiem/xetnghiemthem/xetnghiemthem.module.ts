import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XetnghiemthemPageRoutingModule } from './xetnghiemthem-routing.module';

import { XetnghiemthemPage } from './xetnghiemthem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XetnghiemthemPageRoutingModule
  ],
  declarations: [XetnghiemthemPage]
})
export class XetnghiemthemPageModule {}
