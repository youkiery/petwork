import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelbenhnhanPageRoutingModule } from './excelbenhnhan-routing.module';

import { ExcelbenhnhanPage } from './excelbenhnhan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelbenhnhanPageRoutingModule
  ],
  declarations: [ExcelbenhnhanPage]
})
export class ExcelbenhnhanPageModule {}
