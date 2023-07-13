import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisxemchitietdieutriPageRoutingModule } from './hisxemchitietdieutri-routing.module';

import { HisxemchitietdieutriPage } from './hisxemchitietdieutri.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisxemchitietdieutriPageRoutingModule
  ],
  declarations: [HisxemchitietdieutriPage]
})
export class HisxemchitietdieutriPageModule {}
