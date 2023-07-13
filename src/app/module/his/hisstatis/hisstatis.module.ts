import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisstatisPageRoutingModule } from './hisstatis-routing.module';

import { HisstatisPage } from './hisstatis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisstatisPageRoutingModule
  ],
  declarations: [HisstatisPage]
})
export class HisstatisPageModule {}
