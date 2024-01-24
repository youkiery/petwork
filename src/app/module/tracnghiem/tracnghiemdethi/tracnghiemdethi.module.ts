import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TracnghiemdethiPageRoutingModule } from './tracnghiemdethi-routing.module';

import { TracnghiemdethiPage } from './tracnghiemdethi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TracnghiemdethiPageRoutingModule
  ],
  declarations: [TracnghiemdethiPage]
})
export class TracnghiemdethiPageModule {}
