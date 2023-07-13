import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelthemcauhinhPageRoutingModule } from './excelthemcauhinh-routing.module';

import { ExcelthemcauhinhPage } from './excelthemcauhinh.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelthemcauhinhPageRoutingModule
  ],
  declarations: [ExcelthemcauhinhPage]
})
export class ExcelthemcauhinhPageModule {}
