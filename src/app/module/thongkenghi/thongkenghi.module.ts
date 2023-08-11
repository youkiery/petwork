import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThongkenghiPageRoutingModule } from './thongkenghi-routing.module';

import { ThongkenghiPage } from './thongkenghi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThongkenghiPageRoutingModule
  ],
  declarations: [ThongkenghiPage]
})
export class ThongkenghiPageModule {}
