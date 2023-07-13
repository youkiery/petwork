import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisdinsertiseasePageRoutingModule } from './hisdinsertisease-routing.module';

import { HisdinsertiseasePage } from './hisdinsertisease.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisdinsertiseasePageRoutingModule
  ],
  declarations: [HisdinsertiseasePage]
})
export class HisdinsertiseasePageModule {}
