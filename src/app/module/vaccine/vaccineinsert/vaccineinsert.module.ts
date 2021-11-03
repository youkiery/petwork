import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaccineinsertPageRoutingModule } from './vaccineinsert-routing.module';

import { VaccineinsertPage } from './vaccineinsert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaccineinsertPageRoutingModule
  ],
  declarations: [VaccineinsertPage]
})
export class VaccineinsertPageModule {}
