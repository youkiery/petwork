import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisdetailPageRoutingModule } from './hisdetail-routing.module';

import { HisdetailPage } from './hisdetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisdetailPageRoutingModule
  ],
  declarations: [HisdetailPage]
})
export class HisdetailPageModule {}
