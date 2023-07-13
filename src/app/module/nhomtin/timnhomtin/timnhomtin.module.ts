import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TimnhomtinPageRoutingModule } from './timnhomtin-routing.module';

import { TimnhomtinPage } from './timnhomtin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TimnhomtinPageRoutingModule
  ],
  declarations: [TimnhomtinPage]
})
export class TimnhomtinPageModule {}
