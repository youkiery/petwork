import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaccineloaitruPageRoutingModule } from './vaccineloaitru-routing.module';

import { VaccineloaitruPage } from './vaccineloaitru.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaccineloaitruPageRoutingModule
  ],
  declarations: [VaccineloaitruPage]
})
export class VaccineloaitruPageModule {}
