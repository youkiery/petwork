import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatlichPageRoutingModule } from './datlich-routing.module';

import { DatlichPage } from './datlich.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatlichPageRoutingModule
  ],
  declarations: [DatlichPage]
})
export class DatlichPageModule {}
