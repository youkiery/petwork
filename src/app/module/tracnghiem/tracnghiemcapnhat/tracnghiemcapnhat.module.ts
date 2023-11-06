import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TracnghiemcapnhatPageRoutingModule } from './tracnghiemcapnhat-routing.module';

import { TracnghiemcapnhatPage } from './tracnghiemcapnhat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TracnghiemcapnhatPageRoutingModule
  ],
  declarations: [TracnghiemcapnhatPage]
})
export class TracnghiemcapnhatPageModule {}
