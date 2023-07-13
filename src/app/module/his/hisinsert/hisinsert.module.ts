import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisinsertPageRoutingModule } from './hisinsert-routing.module';

import { HisinsertPage } from './hisinsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisinsertPageRoutingModule
  ],
  declarations: [HisinsertPage]
})
export class HisinsertPageModule {}
