import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Hisstatistic2PageRoutingModule } from './hisstatistic2-routing.module';

import { Hisstatistic2Page } from './hisstatistic2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Hisstatistic2PageRoutingModule
  ],
  declarations: [Hisstatistic2Page]
})
export class Hisstatistic2PageModule {}
