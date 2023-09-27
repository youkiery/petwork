import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { XetnghiemthemgiongPageRoutingModule } from './xetnghiemthemgiong-routing.module';

import { XetnghiemthemgiongPage } from './xetnghiemthemgiong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    XetnghiemthemgiongPageRoutingModule
  ],
  declarations: [XetnghiemthemgiongPage]
})
export class XetnghiemthemgiongPageModule {}
