import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TracnghiemketquaPageRoutingModule } from './tracnghiemketqua-routing.module';

import { TracnghiemketquaPage } from './tracnghiemketqua.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TracnghiemketquaPageRoutingModule
  ],
  declarations: [TracnghiemketquaPage]
})
export class TracnghiemketquaPageModule {}
