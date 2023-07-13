import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VattuthongkePageRoutingModule } from './vattuthongke-routing.module';

import { VattuthongkePage } from './vattuthongke.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VattuthongkePageRoutingModule
  ],
  declarations: [VattuthongkePage]
})
export class VattuthongkePageModule {}
