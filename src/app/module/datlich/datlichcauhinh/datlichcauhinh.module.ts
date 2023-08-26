import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatlichcauhinhPageRoutingModule } from './datlichcauhinh-routing.module';

import { DatlichcauhinhPage } from './datlichcauhinh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatlichcauhinhPageRoutingModule
  ],
  declarations: [DatlichcauhinhPage]
})
export class DatlichcauhinhPageModule {}
