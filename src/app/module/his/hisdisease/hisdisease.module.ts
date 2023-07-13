import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisdiseasePageRoutingModule } from './hisdisease-routing.module';

import { HisdiseasePage } from './hisdisease.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisdiseasePageRoutingModule
  ],
  declarations: [HisdiseasePage]
})
export class HisdiseasePageModule {}
