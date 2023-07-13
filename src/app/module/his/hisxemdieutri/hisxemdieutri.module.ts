import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisxemdieutriPageRoutingModule } from './hisxemdieutri-routing.module';

import { HisxemdieutriPage } from './hisxemdieutri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisxemdieutriPageRoutingModule
  ],
  declarations: [HisxemdieutriPage]
})
export class HisxemdieutriPageModule {}
