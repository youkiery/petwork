import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelhotelPageRoutingModule } from './excelhotel-routing.module';

import { ExcelhotelPage } from './excelhotel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelhotelPageRoutingModule
  ],
  declarations: [ExcelhotelPage]
})
export class ExcelhotelPageModule {}
