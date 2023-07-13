import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VattuthemPageRoutingModule } from './vattuthem-routing.module';

import { VattuthemPage } from './vattuthem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VattuthemPageRoutingModule
  ],
  declarations: [VattuthemPage]
})
export class VattuthemPageModule {}
