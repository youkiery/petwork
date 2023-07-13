import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoinhuannhapPageRoutingModule } from './loinhuannhap-routing.module';

import { LoinhuannhapPage } from './loinhuannhap.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoinhuannhapPageRoutingModule
  ],
  declarations: [LoinhuannhapPage]
})
export class LoinhuannhapPageModule {}
