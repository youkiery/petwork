import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelthemspaPageRoutingModule } from './excelthemspa-routing.module';

import { ExcelthemspaPage } from './excelthemspa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelthemspaPageRoutingModule
  ],
  declarations: [ExcelthemspaPage]
})
export class ExcelthemspaPageModule {}
