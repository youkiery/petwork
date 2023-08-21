import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatlichchuyenmonPageRoutingModule } from './datlichchuyenmon-routing.module';

import { DatlichchuyenmonPage } from './datlichchuyenmon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatlichchuyenmonPageRoutingModule
  ],
  declarations: [DatlichchuyenmonPage]
})
export class DatlichchuyenmonPageModule {}
