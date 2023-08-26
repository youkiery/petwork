import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpabieudoPageRoutingModule } from './spabieudo-routing.module';

import { SpabieudoPage } from './spabieudo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpabieudoPageRoutingModule
  ],
  declarations: [SpabieudoPage]
})
export class SpabieudoPageModule {}
