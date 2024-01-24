import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TracnghiemchuyenmucPageRoutingModule } from './tracnghiemchuyenmuc-routing.module';

import { TracnghiemchuyenmucPage } from './tracnghiemchuyenmuc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TracnghiemchuyenmucPageRoutingModule
  ],
  declarations: [TracnghiemchuyenmucPage]
})
export class TracnghiemchuyenmucPageModule {}
