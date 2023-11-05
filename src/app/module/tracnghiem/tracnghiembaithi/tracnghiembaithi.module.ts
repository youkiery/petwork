import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TracnghiembaithiPageRoutingModule } from './tracnghiembaithi-routing.module';

import { TracnghiembaithiPage } from './tracnghiembaithi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TracnghiembaithiPageRoutingModule
  ],
  declarations: [TracnghiembaithiPage]
})
export class TracnghiembaithiPageModule {}
