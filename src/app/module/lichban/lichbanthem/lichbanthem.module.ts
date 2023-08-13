import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LichbanthemPageRoutingModule } from './lichbanthem-routing.module';

import { LichbanthemPage } from './lichbanthem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LichbanthemPageRoutingModule
  ],
  declarations: [LichbanthemPage]
})
export class LichbanthemPageModule {}
