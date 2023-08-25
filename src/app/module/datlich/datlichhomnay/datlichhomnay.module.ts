import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatlichhomnayPageRoutingModule } from './datlichhomnay-routing.module';

import { DatlichhomnayPage } from './datlichhomnay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatlichhomnayPageRoutingModule
  ],
  declarations: [DatlichhomnayPage]
})
export class DatlichhomnayPageModule {}
