import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VattutangPageRoutingModule } from './vattutang-routing.module';

import { VattutangPage } from './vattutang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VattutangPageRoutingModule
  ],
  declarations: [VattutangPage]
})
export class VattutangPageModule {}
