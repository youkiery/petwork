import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TracnghiemPageRoutingModule } from './tracnghiem-routing.module';

import { TracnghiemPage } from './tracnghiem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TracnghiemPageRoutingModule
  ],
  declarations: [TracnghiemPage]
})
export class TracnghiemPageModule {}
