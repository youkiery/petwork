import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelconfigformPageRoutingModule } from './excelconfigform-routing.module';

import { ExcelconfigformPage } from './excelconfigform.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelconfigformPageRoutingModule
  ],
  declarations: [ExcelconfigformPage]
})
export class ExcelconfigformPageModule {}
