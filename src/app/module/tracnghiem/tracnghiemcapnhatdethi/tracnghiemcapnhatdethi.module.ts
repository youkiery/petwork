import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TracnghiemcapnhatdethiPageRoutingModule } from './tracnghiemcapnhatdethi-routing.module';

import { TracnghiemcapnhatdethiPage } from './tracnghiemcapnhatdethi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TracnghiemcapnhatdethiPageRoutingModule
  ],
  declarations: [TracnghiemcapnhatdethiPage]
})
export class TracnghiemcapnhatdethiPageModule {}
