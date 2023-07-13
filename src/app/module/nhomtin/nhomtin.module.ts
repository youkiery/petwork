import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NhomtinPageRoutingModule } from './nhomtin-routing.module';

import { NhomtinPage } from './nhomtin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NhomtinPageRoutingModule
  ],
  declarations: [NhomtinPage]
})
export class NhomtinPageModule {}
