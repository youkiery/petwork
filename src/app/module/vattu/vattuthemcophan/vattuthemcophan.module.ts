import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VattuthemcophanPageRoutingModule } from './vattuthemcophan-routing.module';

import { VattuthemcophanPage } from './vattuthemcophan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VattuthemcophanPageRoutingModule
  ],
  declarations: [VattuthemcophanPage]
})
export class VattuthemcophanPageModule {}
