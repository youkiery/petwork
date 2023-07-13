import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpachitietthongkePageRoutingModule } from './spachitietthongke-routing.module';

import { SpachitietthongkePage } from './spachitietthongke.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpachitietthongkePageRoutingModule
  ],
  declarations: [SpachitietthongkePage]
})
export class SpachitietthongkePageModule {}
