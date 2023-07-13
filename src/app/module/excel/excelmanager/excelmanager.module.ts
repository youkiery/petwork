import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelmanagerPageRoutingModule } from './excelmanager-routing.module';

import { ExcelmanagerPage } from './excelmanager.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelmanagerPageRoutingModule
  ],
  declarations: [ExcelmanagerPage]
})
export class ExcelmanagerPageModule {}
