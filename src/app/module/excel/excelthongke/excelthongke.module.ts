import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelthongkePageRoutingModule } from './excelthongke-routing.module';

import { ExcelthongkePage } from './excelthongke.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelthongkePageRoutingModule
  ],
  declarations: [ExcelthongkePage]
})
export class ExcelthongkePageModule {}
