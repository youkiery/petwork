import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExcelsualoinhuanPageRoutingModule } from './excelsualoinhuan-routing.module';

import { ExcelsualoinhuanPage } from './excelsualoinhuan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExcelsualoinhuanPageRoutingModule
  ],
  declarations: [ExcelsualoinhuanPage]
})
export class ExcelsualoinhuanPageModule {}
