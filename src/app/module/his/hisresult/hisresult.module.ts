import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisresultPageRoutingModule } from './hisresult-routing.module';

import { HisresultPage } from './hisresult.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisresultPageRoutingModule
  ],
  declarations: [HisresultPage]
})
export class HisresultPageModule {}
