import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChitietnhomtinPageRoutingModule } from './chitietnhomtin-routing.module';

import { ChitietnhomtinPage } from './chitietnhomtin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChitietnhomtinPageRoutingModule
  ],
  declarations: [ChitietnhomtinPage]
})
export class ChitietnhomtinPageModule {}
