import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VattuimportPageRoutingModule } from './vattuimport-routing.module';

import { VattuimportPage } from './vattuimport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VattuimportPageRoutingModule
  ],
  declarations: [VattuimportPage]
})
export class VattuimportPageModule {}
