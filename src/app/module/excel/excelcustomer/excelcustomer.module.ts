import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelcustomerPageRoutingModule } from './excelcustomer-routing.module';

import { ExcelcustomerPage } from './excelcustomer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelcustomerPageRoutingModule
  ],
  declarations: [ExcelcustomerPage]
})
export class ExcelcustomerPageModule {}
