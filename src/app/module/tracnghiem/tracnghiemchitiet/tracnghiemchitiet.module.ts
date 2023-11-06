import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TracnghiemchitietPageRoutingModule } from './tracnghiemchitiet-routing.module';

import { TracnghiemchitietPage } from './tracnghiemchitiet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TracnghiemchitietPageRoutingModule
  ],
  declarations: [TracnghiemchitietPage]
})
export class TracnghiemchitietPageModule {}
