import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelthemkieuPageRoutingModule } from './excelthemkieu-routing.module';

import { ExcelthemkieuPage } from './excelthemkieu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelthemkieuPageRoutingModule
  ],
  declarations: [ExcelthemkieuPage]
})
export class ExcelthemkieuPageModule {}
