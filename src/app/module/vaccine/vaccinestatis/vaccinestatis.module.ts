import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VaccinestatisPageRoutingModule } from './vaccinestatis-routing.module';

import { VaccinestatisPage } from './vaccinestatis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VaccinestatisPageRoutingModule
  ],
  declarations: [VaccinestatisPage]
})
export class VaccinestatisPageModule {}
