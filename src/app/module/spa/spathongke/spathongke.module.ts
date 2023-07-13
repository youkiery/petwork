import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpathongkePageRoutingModule } from './spathongke-routing.module';

import { SpathongkePage } from './spathongke.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpathongkePageRoutingModule
  ],
  declarations: [SpathongkePage]
})
export class SpathongkePageModule {}
