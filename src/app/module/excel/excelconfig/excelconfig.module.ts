import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelconfigPageRoutingModule } from './excelconfig-routing.module';

import { ExcelconfigPage } from './excelconfig.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelconfigPageRoutingModule
  ],
  declarations: [ExcelconfigPage]
})
export class ExcelconfigPageModule {}
