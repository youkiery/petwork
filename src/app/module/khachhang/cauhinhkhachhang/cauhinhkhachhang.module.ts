import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CauhinhkhachhangPageRoutingModule } from './cauhinhkhachhang-routing.module';

import { CauhinhkhachhangPage } from './cauhinhkhachhang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CauhinhkhachhangPageRoutingModule
  ],
  declarations: [CauhinhkhachhangPage]
})
export class CauhinhkhachhangPageModule {}
