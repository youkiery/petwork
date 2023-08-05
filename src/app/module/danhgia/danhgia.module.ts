import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DanhgiaPageRoutingModule } from './danhgia-routing.module';

import { DanhgiaPage } from './danhgia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DanhgiaPageRoutingModule
  ],
  declarations: [DanhgiaPage]
})
export class DanhgiaPageModule {}
