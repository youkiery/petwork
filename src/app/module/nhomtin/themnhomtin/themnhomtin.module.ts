import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThemnhomtinPageRoutingModule } from './themnhomtin-routing.module';

import { ThemnhomtinPage } from './themnhomtin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThemnhomtinPageRoutingModule
  ],
  declarations: [ThemnhomtinPage]
})
export class ThemnhomtinPageModule {}
