import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisstatisdiseasePageRoutingModule } from './hisstatisdisease-routing.module';

import { HisstatisdiseasePage } from './hisstatisdisease.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisstatisdiseasePageRoutingModule
  ],
  declarations: [HisstatisdiseasePage]
})
export class HisstatisdiseasePageModule {}
