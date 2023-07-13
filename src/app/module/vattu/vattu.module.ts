import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VattuPageRoutingModule } from './vattu-routing.module';

import { VattuPage } from './vattu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VattuPageRoutingModule
  ],
  declarations: [VattuPage]
})
export class VattuPageModule {}
