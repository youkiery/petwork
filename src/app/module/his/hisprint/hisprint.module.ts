import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HisprintPageRoutingModule } from './hisprint-routing.module';

import { HisprintPage } from './hisprint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HisprintPageRoutingModule
  ],
  declarations: [HisprintPage]
})
export class HisprintPageModule {}
