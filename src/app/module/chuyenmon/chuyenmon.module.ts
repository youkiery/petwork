import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChuyenmonPageRoutingModule } from './chuyenmon-routing.module';

import { ChuyenmonPage } from './chuyenmon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChuyenmonPageRoutingModule
  ],
  declarations: [ChuyenmonPage]
})
export class ChuyenmonPageModule {}
