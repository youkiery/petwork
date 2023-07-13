import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VattucophanPageRoutingModule } from './vattucophan-routing.module';

import { VattucophanPage } from './vattucophan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VattucophanPageRoutingModule
  ],
  declarations: [VattucophanPage]
})
export class VattucophanPageModule {}
