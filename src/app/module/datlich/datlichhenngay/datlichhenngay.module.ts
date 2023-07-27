import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatlichhenngayPageRoutingModule } from './datlichhenngay-routing.module';

import { DatlichhenngayPage } from './datlichhenngay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatlichhenngayPageRoutingModule
  ],
  declarations: [DatlichhenngayPage]
})
export class DatlichhenngayPageModule {}
