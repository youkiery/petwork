import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InoutPageRoutingModule } from './inout-routing.module';

import { InoutPage } from './inout.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InoutPageRoutingModule
  ],
  declarations: [InoutPage]
})
export class InoutPageModule {}
