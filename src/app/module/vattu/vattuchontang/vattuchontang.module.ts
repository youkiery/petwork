import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VattuchontangPageRoutingModule } from './vattuchontang-routing.module';

import { VattuchontangPage } from './vattuchontang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VattuchontangPageRoutingModule
  ],
  declarations: [VattuchontangPage]
})
export class VattuchontangPageModule {}
